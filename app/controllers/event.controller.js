const db = require("../models");
const { v4: uuidv4 } = require('uuid');

const Event = db.event;
const Product = db.product;
const Organizer = db.organizer;


exports.createEvent = async (req, res) => {
    const { products, organizers } = req.body; // Assicurati che organizers sia presente nel corpo della richiesta

    try {
        const event = await db.sequelize.transaction(async (t) => {
            // Crea l'evento con eventUUID anziché id
            const createdEvent = await Event.create({
                name: req.body.name,
                description: req.body.description,
                date: req.body.date,
                location: req.body.location,
                capacity: req.body.capacity,
                imageUrl: req.body.imageUrl,
                category: req.body.category,
                email: req.body.email,
                status: req.body.status,
            }, { transaction: t });

            // Se ci sono prodotti associati all'evento, creali
            if (products && products.length > 0) {
                const productPromises = products.map((product) => {
                    return Product.create({
                        name: product.name,
                        price: product.price,
                        maxSellable: product.maxSellable,
                        eventId: createdEvent.id
                    }, { transaction: t });
                });

                await Promise.all(productPromises);
            }


            return createdEvent;
        });

        res.status(201).send({ message: "Event added successfully!", event });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.deleteEventByUUID = (req, res) => {
    const uuid = req.params.uuid;
    Event.destroy({
        where: {
            uuid: uuid
        }
    }).then((event) => {
        res.status(200).send({ message: 'Event eliminated successfully!' });
    })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.getEventsByEmail = (req, res) => {
    const email = req.body.email;

    Event.findAll({
        where: {
            email: email
        },
        include: [{
            model: Product,
            attributes: ['uuid', 'name', 'price', 'maxSellable']
        }],
        order: [
            ['updatedAt', 'DESC']
        ]
    })
        .then((events) => {
            res.status(200).send(events);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.getEventByUUID = (req, res) => {
    const uuid = req.params.uuid;

    Event.findOne({
        where: {
            uuid: uuid
        },
        include: [{
            model: Product,
            attributes: ['uuid', 'name', 'price', 'maxSellable']
        }],
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
    const { category, date } = req.query; // Extract query parameters

    try {
        let whereCondition = {};
        if (category) {
            whereCondition.category = category;
        }
        if (date) {
            whereCondition.date = new Date(date);
        }


        const events = await Event.findAll({
            where: whereCondition,
            include: [{
                model: Product,
                attributes: ['uuid', 'name', 'price', 'maxSellable']
            }],
            order: [['updatedAt', 'DESC']]
        });

        res.status(200).send(events);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
