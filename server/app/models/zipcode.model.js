module.exports = (sequelize, Sequelize) => {
  const ZipCode = sequelize.define("ZipCode", {
    zip: 
    {
      type: Sequelize.INTEGER
    },
    state: 
    {
      type: Sequelize.STRING
    },
    city: 
    {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
  });
  ZipCode.removeAttribute('id')
  return ZipCode;
};