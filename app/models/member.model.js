module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define("Member", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Automatically generates a unique UUID
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Validates that the value is an email
            },
        },
        cellphone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT, // Allows long text for addresses
            allowNull: true,
        },
        sectorId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        professionId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        county: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        house_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        postcode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        quarter: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        road: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        town: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Member;
};
