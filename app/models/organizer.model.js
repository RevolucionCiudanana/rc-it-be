
module.exports = (sequelize, Sequelize) => {
    const Organizer = sequelize.define('organizer', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        contactEmail: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        website: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        userUUID: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    return Organizer;
};
