const db = require("../models");
const { v4: uuidv4 } = require('uuid');

const Event = db.event;

const spacesEndpoint = new AWS.Endpoint("fra1.digitaloceanspaces.com");
const s3Client = new AWS.S3({
    endpoint: spacesEndpoint,
    region: "fra1",
    credentials: {
        accessKeyId: "DO007FYKN8R7G7L4ZBCB",
        secretAccessKey: "5dkD71dyiZHvA+pUnBl1Ho7kRS6hCwtkjziHT7WN3ew",
    },
});

exports.createEvent = async (req, res) => {
    try {
        const files = req.files; // Assuming you're using `multer` for file uploads

        // Start a transaction to handle event and document creation
        const event = await db.sequelize.transaction(async (t) => {
            // Step 1: Create the event
            const createdEvent = await Event.create({
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                location: req.body.location,
                startDateTime: req.body.startDateTime,
                endDateTime: req.body.endDateTime,
                category: req.body.category,
                contactInfo: req.body.contactInfo,
                imageUrl: req.body.imageUrl,
                status: req.body.status,
            }, { transaction: t });

            // Step 2: Upload documents to storage (Digital Ocean Spaces or other)
            const uploadPromises = files.map((file) => {
                const timestamp = Date.now();
                const params = {
                    Bucket: "rc-italia",
                    Key: `events/startDateTime/${timestamp}/${file.originalname}`,
                    Body: file.buffer,
                };

                return s3Client.upload(params).promise();
            });

            const uploadedFiles = await Promise.all(uploadPromises);

            // Step 3: Save each document in the database (eventDocuments table)
            const documentPromises = uploadedFiles.map((result) => {
                return EventDocuments.create({
                    eventId: createdEvent.id, // Use eventId linked to the created event
                    etag: result.ETag,
                    location: result.Location,
                    keyFile: result.Key,
                    bucket: result.Bucket,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, { transaction: t });
            });

            await Promise.all(documentPromises);

            return createdEvent;
        });

        res.status(201).send({ message: "Event and documents added successfully!", event });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.deleteEventById = (req, res) => {
    const id = req.params.id;
    Event.destroy({
        where: {
            id: id
        }
    }).then((event) => {
        res.status(200).send({ message: 'Event eliminated successfully!' });
    })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.getEventById = (req, res) => {
    const id = req.params.id;

    Event.findOne({
        where: {
            id: id
        },
    })
        .then((event) => {
            if (!event) {
                return res.status(404).send({ message: "Event not found." });
            }
            res.status(200).send(event);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.getEvents = async (req, res) => {
    const { type, date } = req.query; // Extract query parameters

    try {
        let whereCondition = {};
        if (type) {
            whereCondition.type = type;
        }
        if (date) {
            whereCondition.date = new Date(date);
        }

        const events = await Event.findAll({
            where: whereCondition,
            order: [['updatedAt', 'DESC']]
        });

        res.status(200).send(events);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
