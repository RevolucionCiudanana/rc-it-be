const config = require("../config/db.config.js");

const Sequelize = require("sequelize");

console.log("config", config)
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.event = require("../models/event.model.js")(sequelize, Sequelize);
db.country = require("../models/country.model.js")(sequelize, Sequelize);
db.sector = require("../models/sector.model.js")(sequelize, Sequelize);
db.profession = require("../models/profession.model.js")(sequelize, Sequelize);
db.member = require("../models/member.model.js")(sequelize, Sequelize);
db.eventDocument = require("./eventDocument.model.js")(sequelize, Sequelize);

UserRoles = sequelize.define("user_roles", {
  userId: Sequelize.STRING,
  roleId: Sequelize.STRING,
});

db.profession.belongsTo(db.sector, { foreignKey: 'sectorId', as: 'sector' });


//UserRoles
db.role.belongsToMany(db.user, {
  foreignKey: "roleId",
  otherKey: "userId",
  through: UserRoles,
  as: "users",
});

db.user.belongsToMany(db.role, {
  foreignKey: "userId",
  otherKey: "roleId",
  through: UserRoles,
  as: "roles",
});

db.eventDocument.belongsTo(db.event, { foreignKey: "eventId", as: "event" });

db.event.hasMany(db.eventDocument, {
  foreignKey: "eventId",
  as: "eventDocuments",
});


db.ROLES = ["user", "admin", "affiliate"];

module.exports = db;
