// models/profession.model.js
module.exports = (sequelize, Sequelize) => {
    const Profession = sequelize.define("professions", {
        name: {
            type: Sequelize.STRING,
            allowNull: false, // Make it required
        },
        code: {
            type: Sequelize.STRING,
            allowNull: true, // Make it required
        },
        sectorId: {
            type: Sequelize.INTEGER,
            allowNull: false, // Make it required
            references: {
                model: 'sectors', // This references the `sectors` table
                key: 'id', // This is the primary key in the `sectors` table
            },
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW, // Set default to current date
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW, // Set default to current date
        },
    }, {
        timestamps: true, // Automatically manage createdAt and updatedAt
    });

    return Profession;
};
