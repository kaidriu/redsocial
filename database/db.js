const dbConfig = require("./config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  // port: 5945,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.profile = require("../models/profile.js")(sequelize, Sequelize);
db.user = require("../models/user.js")(sequelize, Sequelize);
db.publication = require("../models/publication.js")(sequelize, Sequelize);


// db.user.hasMany(db.profile);

//relaciones
db.profile.belongsTo(db.user);

db.user.hasMany(db.publication);



module.exports = db;