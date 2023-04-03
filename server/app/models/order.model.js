module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Order", {
    firstName:
    {
      type: Sequelize.STRING,
    },
    lastName:
    {
      type: Sequelize.STRING
    },
    phone: 
    {
      type: Sequelize.STRING
    },
    email: 
    {
      type: Sequelize.STRING
    },
    address: 
    {
      type: Sequelize.STRING
    },
    city: 
    {
      type: Sequelize.STRING
    },
    shippingMethod: 
    {
      type: Sequelize.STRING
    },
    ratingId: 
    {
      type: Sequelize.INTEGER
    },
    userId:
    {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  });

  return Order;
};