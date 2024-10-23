module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true, // Aggiunto per definire 'id' come chiave primaria
        },
        title: {
            type: Sequelize.STRING, // Campo per il titolo dell'evento
        },
        shortDescription: {
            type: Sequelize.STRING, // Campo per la descrizione breve
        },
        location: {
            type: Sequelize.STRING, // Campo per il luogo dell'evento
        },
        startDateTime: {
            type: Sequelize.DATE, // Campo per la data e ora di inizio
        },
        endDateTime: {
            type: Sequelize.DATE, // Campo per la data e ora di fine
        },
        category: {
            type: Sequelize.STRING, // Campo per la tipologia (in inglese)
        },
        contactInfo: {
            type: Sequelize.STRING, // Campo per le informazioni di contatto
        },
        imageUrl: {
            type: Sequelize.STRING, // Campo per l'URL dell'immagine
        },
        status: {
            type: Sequelize.STRING, // Campo per lo stato dell'evento
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });

    return Event;
};
