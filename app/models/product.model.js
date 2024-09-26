// product.model.js

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        maxSellable: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    // Associations
    Product.associate = (models) => {
        Product.belongsTo(models.Event, {
            foreignKey: 'eventId',
            onDelete: 'CASCADE'
        });
    };

    return Product;
};
