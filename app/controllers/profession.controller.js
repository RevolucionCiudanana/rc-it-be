const db = require("../models");
const Profession = db.profession;
const Op = db.Sequelize.Op;

exports.allProfessionsBySector = (req, res) => {
    const { sector } = req.query;

    Profession.findAll({
        where: { sectorId: sector }
    })
        .then((professions) => {
            res.status(200).send(professions);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};
exports.allProfessions = (req, res) => {

    Profession.findAll({
    })
        .then((professions) => {
            res.status(200).send(professions);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

