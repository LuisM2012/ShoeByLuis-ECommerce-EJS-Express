module.exports = app => {
  
  const Cart = require("./cart.controller");

  var router = require("express").Router();

  router.post("/order", Cart.sendOrder);

  router.post("/", Cart.create);
  
  router.get("/", Cart.getAll);
  
  router.put("/", Cart.update);

  router.delete("/", Cart.delete);

  app.use('/cart', router);
};
