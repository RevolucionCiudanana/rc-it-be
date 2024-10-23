module.exports = (sequelize, Sequelize) => {
    const EventDocuments = sequelize.define("eventDocuments", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        eventId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        etag: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        location: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        keyFile: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        bucket: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    });

    return EventDocuments;
};
