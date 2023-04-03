const db = require("../models")
const ZipCode = db.ZipCode

module.exports = app => {

  var router = require("express").Router()

  // Get Info from query
  router.get("/", (req, res) => {

    ZipCode.findAll({ where: req.query})
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({ message: "Error occurred while retrieving Zip Codes" })
    })

  })

  // Get Info from Zip Code
  router.get("/:id", (req, res) => {

    ZipCode.findAll({ where: { zip: req.params.id }})
    .then(list => {
      if (list.length > 0) {
        res.send(list.pop())
      } else {
        res.status(404).send({ message: "Not Found" })
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error finding Item" })
    })
  
  }) 

  app.use('/api/zipcode', router)
}
