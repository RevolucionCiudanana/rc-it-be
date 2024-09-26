const db = require("../models");
const User = db.user;
const UserCompanies = db.userCompanies;
var moment = require("moment/moment");

const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
