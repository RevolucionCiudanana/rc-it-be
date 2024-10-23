const db = require("../models");
const { v4: uuidv4 } = require('uuid');

const Event = db.event;

exports.createEvent = async (req, res) => {
    try {
        const event = await db.sequelize.transaction(async (t) => {
            // Crea l'evento con i nuovi campi
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

            return createdEvent;
        });

        res.status(201).send({ message: "Event added successfully!", event });
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
