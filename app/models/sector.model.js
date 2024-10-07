// models/sector.model.js
module.exports = (sequelize, Sequelize) => {
    const Sector = sequelize.define("sectors", {
        name: {
            type: Sequelize.STRING,
            allowNull: false, // Make it required
        },
        code: {
            type: Sequelize.STRING,
            allowNull: true, // Make it required
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

    return Sector;
};
