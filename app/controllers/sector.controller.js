const db = require("../models");
const Sector = db.sector;
const Op = db.Sequelize.Op;

exports.allSectors = (req, res) => {
    Sector.findAll()
        .then((sectors) => {
            res.status(200).send(sectors);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};
