// NOTE: BAD PRACTICE TO MAKE THIS A PUBLIC FILE & FOLDER
// use .env for best practice

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "83821727",
  DB: "inf124",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};