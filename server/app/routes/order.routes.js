module.exports = app => {
  
  const Orders = require("../controllers/order.controller.js")

  var router = require("express").Router()
  
  router.post("/", Orders.create)
  
  router.get("/", Orders.getAll)
  
  router.get("/user/:id", Orders.getUser)

  router.get("/:id", Orders.get)

  router.put("/:id", Orders.update)

  router.delete("/:id", Orders.delete)

  app.use('/api/orders', router)

}