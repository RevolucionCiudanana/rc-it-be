const db = require("../models");
const Member = db.Member;
const Op = db.Sequelize.Op;

// Create a new member
exports.createMember = (req, res) => {
    const {
        name,
        surname,
        email,
        cellphone,
        sectorId,
        professionId,
        address,
        country,
        country_code,
        county,
        house_number,
        postcode,
        quarter,
        road,
        state,
        town
    } = req.body;

    // Create a member object with all fields
    const newMember = {
        name,
        surname,
        email,
        cellphone,
        sectorId,
        professionId,
        address,
        country,
        country_code,
        county,
        house_number,
        postcode,
        quarter,
        road,
        state,
        town
    };

    // Save the member in the database
    Member.create(newMember)
        .then(member => {
            res.status(201).send({ message: "Member created successfully", member });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Delete a member by ID
exports.deleteMemberById = (req, res) => {
    const id = req.params.id;

    Member.destroy({
        where: { id: id }
    })
        .then(result => {
            if (result === 1) {
                res.status(200).send({ message: "Member deleted successfully" });
            } else {
                res.status(404).send({ message: `Cannot delete Member with id=${id}. Member not found!` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Get a member by ID
exports.getMemberById = (req, res) => {
    const id = req.params.id;

    Member.findByPk(id)
        .then(member => {
            if (member) {
                res.status(200).send(member);
            } else {
                res.status(404).send({ message: `Member with id=${id} not found` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Get all members
exports.getAllMembers = (req, res) => {
    Member.findAll()
        .then(members => {
            res.status(200).send(members);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
