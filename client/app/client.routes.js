module.exports = app => {
  
  const Controller = require("./client.controller");

  var router = require("express").Router();
  
  router.get("/order/:id", Controller.order);
  
  router.get("/browse/:text", Controller.browse);
  
  router.get("/browse", Controller.browseAll);

  router.get("/details/:sku", Controller.details);
  
  router.get("/checkout", Controller.checkout);

  router.get("/images/:src", (req, res) => {
    const serverURL = 'http://localhost:5500/api/images' // url for api
    res.redirect(`${serverURL}/${req.params.src}`)
  });

  router.get("/", Controller.home);

  app.use('', router);

};
