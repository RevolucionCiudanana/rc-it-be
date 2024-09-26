const db = require("../models");
const { v4: uuidv4 } = require('uuid');
const Organizer = db.organizer;

exports.createOrganizer = async (req, res) => {
    const uniqueId = uuidv4();

    try {
        const organizer = await Organizer.create({
            uuid: uniqueId,
            name: req.body.name,
            contactEmail: req.body.contactEmail,
            phoneNumber: req.body.phoneNumber,
            website: req.body.website,
            address: req.body.address,
            imageUrl: req.body.imageUrl,
            userUUID: req.body.userUUID,
        });
        res.status(201).send({ message: "Organizer created successfully!", organizer });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteOrganizerByUUID = (req, res) => {
    const uuid = req.params.uuid;
    Organizer.destroy({
        where: {
            uuid: uuid
        }
    }).then(() => {
        res.status(200).send({ message: 'Organizer deleted successfully!' });
    })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.getOrganizerByUUID = (req, res) => {
    const uuid = req.params.uuid;

    Organizer.findOne({
        where: {
            uuid: uuid
        }
    })
        .then((organizer) => {
            if (!organizer) {
                return res.status(404).send({ message: "Organizer not found." });
            }
            res.status(200).send(organizer);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.getOrganizersByUserUUID = (req, res) => {
    const userUUID = req.params.userUUID;

    Organizer.findAll({
        where: {
            userUUID: userUUID
        }
    })
        .then((organizers) => {
            res.status(200).send(organizers);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.getOrganizers = (req, res) => {
    Organizer.findAll()
        .then((organizers) => {
            res.status(200).send(organizers);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};
