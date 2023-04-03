const db = require("../models")
const Orders = db.Orders
const ItemOrder = db.ItemOrder

// Create and Save
exports.create = (req, res) => {

  // Validate for required Body variables
  if (!(req.body.userId && req.body.address && req.body.city && 
        req.body.shippingMethod && req.body.items)) {
    res.status(400).send({message: "Content can not be empty!"})
    return
  }

  // Create an Order
  const order = {
    userId: req.body.userId, // REQUIRED
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address, // REQUIRED
    city: req.body.city, // REQUIRED
    shippingMethod: req.body.shippingMethod, // REQUIRED
    ratingId: req.body.ratingId
  }

  // Save Order
  Orders.create(order)
  .then(data => { 
    for( let i = 0; i < req.body.items.length; i++)
    {
      var itemOrder = {
        orderId: data.dataValues.id,
        sku: req.body.items[i].sku,
        quantity: req.body.items[i].quantity,
        shoeSize: req.body.items[i].shoeSize
      }
      ItemOrder.create(itemOrder)
    }
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({ message: "Error occurred while adding Order" })
  })
}

// Get all from the database
exports.getAll = (req, res) => {

  Orders.findAll({ where: req.query})
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({ message: "Error occurred while retrieving Orders" })
  })

}

// Get all for one user
exports.getUser = (req, res) => {

  Orders.findAll({ where : { userId : req.params.id }})
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({ message: "Error occurred while retrieving Orders" })
  })

}

// Get by id
exports.get = (req, res) => {

  Orders.findByPk(req.params.id)
  .then(data => {
    if (data) {
      res.send(data)
    } else {
      res.status(404).send({ message: "Order Not Found" })
    }
  })
  .catch(err => {
    res.status(500).send({ message: "Error occurred while retrieving Order" })
  })

}

// Update by id
exports.update = (req, res) => {

  Orders.update(req.body, { where: { id: req.params.id } })
  .then(num => {
    if (num == 1) {
      res.send({ message: "Order was updated successfully" })
    } else {
      res.status(404).send({ message: "Order Not Found" })
    }
  })
  .catch(err => {
    res.status(500).send({ message: "Error occurred while updating Order" })
  })

}

// Delete by id
exports.delete = (req, res) => {

  Orders.destroy({where: { id: req.params.id }})
  .then(num => {
    if (num == 1) {
      res.send({ message: "Order was deleted successfully" })
    } else {
      res.status(204).send({ message: "Order Not Found" })
    }
  })
  .catch(err => {
    res.status(500).send({ message: "Error occurred while deleting Order" })
  })

}
