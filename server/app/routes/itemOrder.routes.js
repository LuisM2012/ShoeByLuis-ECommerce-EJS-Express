module.exports = app => {

  const ItemOrder = require("../controllers/itemOrder.controller.js")

  var router = require("express").Router()

  router.get("/", ItemOrder.getAll)

  router.get("/:id", ItemOrder.get)

  app.use('/api/item-order', router)

}
