const serverURL = 'http://localhost:5500/api' // url for api

// Send Order
exports.sendOrder = (req, res) => {
  if (!req.session.cart) {
    res.status(404).send("No Items in Cart")
    return
  }
  // Add cart from session to order
  req.body.items = req.session.cart
  req.body.userId = req.sessionID
  if (req.session.cart.length > 0) {
    // Send Order to API
    fetch(serverURL+'/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
    .then(response => {return response.json()})
    .then(orderInfo => { 
      req.session.cart = []
      res.redirect(`../order/${orderInfo.id}`) 
    })
    .catch(error => res.status(500).send(`Error sending order ${error}`))
  } else { res.status(404).send(`No Items in Cart`) }
}

// Create and Save
exports.create = (req, res) => {
  try {
    // Validate
    if (!(req.body.sku && req.body.shoeSize)) {
      res.status(400).send({ message: "Missing body for request" });
      return;
    }
    // Add to cart
    if (!req.session.cart) // cart doesn't exist
    {
      req.session.cart = []
    }
    // item exists
    for (let i = req.session.cart.length-1; i >= 0; i--)
    {
      var item = req.session.cart[i]
      if (item.sku == req.body.sku && item.shoeSize == req.body.shoeSize)
      {
        item.quantity++
        res.redirect('/checkout')
        return
      }
    }
    // item doesn't exist
    const cartItem = {
      sku: req.body.sku,
      shoeSize: req.body.shoeSize,
      quantity: 1,
    };
    req.session.cart.push(cartItem)
    res.redirect('/checkout')
  } catch (err) { res.status(500).send({ message: "Error occurred!" }); }
};

// Get cart
exports.getAll = (req, res) => {
  if (!req.session.cart) // cart doesn't exist
  {
    req.session.cart = [] // create cart
  }
  res.json(req.session.cart);
}

// Update quantity
exports.update = (req, res) => {
  if (!req.session.cart) // cart doesn't exist
  {
    req.session.cart = [] // create cart
  }
  // Update item
  if (req.body.sku && req.body.quantity && req.body.shoeSize)
  {
    let before = 0
    item = req.session.cart.find((item) => {
      return item.sku === req.body.sku && item.shoeSize === req.body.shoeSize
    })
    before = item.quantity
    item.quantity = req.body.quantity
    res.json({before: before, after: item.quantity});
  } else {
    res.status(400).send({message: "Body can not be empty!"})
  }
}

// Delete
exports.delete = (req, res) => {
  try {
    // Remove all from cart
    if (!(req.body.sku && req.body.shoeSize)) {
      req.session.cart = []
      res.send(req.session.cart);
      return;
    }
    // Remove one from cart
    if (!req.session.cart)
    {
      req.session.cart = []
    }
    req.session.cart = req.session.cart.filter(item => {
      return !(item.sku == req.body.sku && item.shoeSize == req.body.shoeSize)
    });

    res.send({ message: "Cart was updated successfully." });
  } catch (err) { console.log(err); res.status(500).send({ message: err | "Error occurred!" }); }
};

