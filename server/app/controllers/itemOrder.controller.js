const db = require("../models")
const ItemOrder = db.ItemOrder

// Get all from the database
exports.getAll = (req, res) => {

  ItemOrder.findAll({ where: req.query})
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({ message: "Error occurred while retrieving Items" })
  })

}

// Get with order Id
exports.get = (req, res) => {

  ItemOrder.findAll({where: { orderId: req.params.id }})
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({ message: "Error finding Item" })
  })

}
