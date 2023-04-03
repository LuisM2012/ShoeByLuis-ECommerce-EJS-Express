const db = require("../models")
const Items = db.Items

// Get all from the database
exports.getAll = (req, res) => {

  Items.findAll({ where: req.query})
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({ message: "Error occurred while retrieving Items" })
  })

}

// Get with sku
exports.get = (req, res) => {

  Items.findByPk(req.params.sku)
  .then(data => {
    if (data) {
      res.send(data)
    } else {
      res.status(404).send({ message: "Not Found" })
    }
  })
  .catch(err => {
    res.status(500).send({ message: "Error finding Item" })
  })

}
