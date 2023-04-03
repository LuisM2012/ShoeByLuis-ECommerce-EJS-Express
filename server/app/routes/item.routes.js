module.exports = app => {
  
  const Items = require("../controllers/item.controller.js")

  var router = require("express").Router()

  router.get("/", Items.getAll)

  router.get("/:sku", Items.get)

  app.use('/api/items', router)

}
