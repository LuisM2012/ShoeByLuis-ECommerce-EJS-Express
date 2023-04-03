module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("Item", {
    sku: 
    {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    brand: 
    {
      type: Sequelize.STRING
    },
    type: 
    {
      type: Sequelize.STRING
    },
    color: 
    {
      type: Sequelize.STRING
    },
    price: 
    {
      type: Sequelize.INTEGER
    },
    image: 
    {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
  });

  return Item;
};