module.exports = (sequelize, Sequelize) => {
  const ItemOrder = sequelize.define("ItemOrder", {
    orderId: 
    {
      type: Sequelize.INTEGER
    },
    sku: 
    {
      type: Sequelize.INTEGER
    },
    quantity: 
    {
      type: Sequelize.INTEGER
    },
    shoeSize: 
    {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
  });

  return ItemOrder;
};