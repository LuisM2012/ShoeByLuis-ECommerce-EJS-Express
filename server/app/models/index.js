const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const DB = {};

// set sequelize
DB.Sequelize = Sequelize;
DB.sequelize = sequelize;

// set all tables
DB.Orders = require("./order.model.js")(sequelize, Sequelize);
DB.Items = require("./item.model.js")(sequelize, Sequelize);
DB.ItemOrder = require("./itemOrder.model.js")(sequelize, Sequelize);
DB.ZipCode = require("./zipcode.model.js")(sequelize, Sequelize);

//export database instance
module.exports = DB;
