const serverURL = 'http://localhost:5500/api' // url for api

// Done
exports.order = async (req, res) => {
  // Get order id from param
  const orderId = req.params.id;
  // Get order information
  let orderInfo = null
  await fetch(serverURL+'/orders/'+orderId)
  .then(response => {return response.json()})
  .then(order => {
    orderInfo = order
  })
  .catch(error => console.error(error))
  // Check if order Exist, else redirect to error page
  if (orderInfo.message) {
    res.render('error')
    return
  }
  // Get order items
  let orderItems = []
  await fetch(serverURL+'/item-order/'+orderId)
  .then(response => {return response.json()})
  .then(items => {
    orderItems = items
  })
  // Get order items information
  let items = []
  let total = 0
  for (let i = 0; i < orderItems.length; i++)
  {
    await fetch(serverURL+'/items/'+orderItems[i].sku)
    .then(response => {return response.json()})
    .then(item => {
      item.shoeSize = orderItems[i].shoeSize
      item.quantity = orderItems[i].quantity
      total += item.price * item.quantity
      items.push(item)
    })
  }
  // Direct to order page
  res.render('order', {
    order: orderInfo,
    orderItems: items,
    orderTotal: total
  })
}
// DONE
exports.browse = (req, res) => {
  const searchFor = req.params.text;
  // Get Items from API
  fetch(serverURL+'/items/')
  .then(response => {return response.json()})
  .then(list => {
    let items = list.filter(text => { return text.type === searchFor })
    // Direct to browse page
    res.render('browse', {
      items: items
    })
  })
  .catch(error => res.status(500).send(error))
}
// 
exports.browseAll = (req, res) => {
  // Get Items from API
  fetch(serverURL+'/items/')
  .then(response => {return response.json()})
  .then(list => {
    if (req.query.search) {
      list = list.filter(item => {
        return item.brand.includes(req.query.search) || 
              item.type.includes(req.query.search)
      })
    }
    res.render('browse', {
      items: list
    })
  })
  .catch(error => res.status(500).send(error))
}
// DONE
exports.details = (req, res) => {
  // Get SKU from parameter passed
  const sku = req.params.sku;
  // Get Item information from API
  fetch(serverURL+"/items/"+sku)
  .then(response => {return response.json()})
  .then(item => {
    // Direct to details page
    res.render('details', {
      item: item,
    })
  })
  .catch(error => { res.status(500).send(error) })
}
// DONE
exports.checkout = async (req, res) => {
  // Check if cart exist for session
  if (!req.session.cart) {
    req.session.cart = []
  }
  // Get cart items information
  let items = []
  let total = 0
  for (let i = 0; i < req.session.cart.length; i++)
  {
    await fetch(serverURL+'/items/'+req.session.cart[i].sku)
    .then(response => {return response.json()})
    .then(item => {
      item.shoeSize = req.session.cart[i].shoeSize
      item.quantity = req.session.cart[i].quantity
      total += item.price * item.quantity
      items.push(item)
    })
  }
  // Direct to checkout page
  res.render('checkout', {
    cart: items,
    total: total,
  })
}
// DONE
exports.home = async (req, res) => {
  let items = []
  let orders = []
  let recentItems = []
  let recentSKU = []
  // Get Items from API
  await fetch(serverURL+'/items/')
  .then(response => {return response.json()})
  .then(list => items = list)
  .catch(error => console.error(error))
  // Get Orders from API
  await fetch(serverURL+`/orders/user/${req.sessionID}`)
  .then(response => { return response.json()})
  .then(list => orders = list)
  .catch(error => console.error(error))
  // Get Order Items
  for (let i = 0; i < orders.length; i++) {
    await fetch(serverURL+'/item-order/'+orders[i].id)
    .then(response => {return response.json()})
    .then(list => { orders[i].items = list })
  }
  // Get Order Items Information
  for (let i = orders.length-1; i >= 0; i--) {
    for (let j = 0; j < orders[i].items.length; j++) {
      // if not in recentSKU, to only have one item instance 
      if (!recentSKU.find(item => { return item == orders[i].items[j].sku })) {
        await fetch(serverURL+'/items/'+orders[i].items[j].sku)
        .then(response => {return response.json()})
        .then(item => {
          recentItems.push(item)
          recentSKU.push(item.sku)
        })
      }
    }
  }
  // Direct to home page
  res.render('home', {
    recentItems: recentItems,
    items: items,
  })
}
