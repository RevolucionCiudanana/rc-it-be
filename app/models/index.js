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
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.organizer = require("../models/organizer.model.js")(sequelize, Sequelize);


UserRoles = sequelize.define("user_roles", {
  userId: Sequelize.STRING,
  roleId: Sequelize.STRING,
});


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

db.event.hasMany(db.product, { foreignKey: 'eventId' });
db.product.belongsTo(db.event, { foreignKey: 'eventId' });

db.ROLES = ["user", "admin", "affiliate"];

module.exports = db;
