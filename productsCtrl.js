var app = require('./server');
var db = app.get('db');

module.exports = {

  createProduct: function(req, res) {
    var createProductArr = [
      req.body.name,
      req.body.description,
      req.body.price,
      req.body.imageurl
    ];
    db.create_product(createProductArr, function(err, response){
      console.log(err, response);
      res.send(response);
    });
  },

  readProducts: function(req, res) {
    db.read_products(function(err, response){
      console.log(err, response);
      res.send(response);
    });
  },

  readProductId: function(req, res) {
    db.read_product(req.params.productId, function(err, response){
      console.log(response);
      console.log(req.params.productId);
      res.send(response);
    });
  },

  updateProductId: function(req, res) {
    var updateProduct = [
      req.params.productId,
      req.body.name,
      req.body.description,
      req.body.price,
      req.body.imageurl
    ];
    db.update_product(updateProduct, function(err, response){
      console.log(err, response);
      res.send(response);
    });
  },

  //update without sql schema
  // updateProductId: function(req, res) {
  //   db.product.update({id: req.params.productId, name:req.body.name, price: req.body.price, description: req.body.description, imageurl: req.body.imageurl}, function(err, response){
  //     console.log(err, response);
  //     res.send(response);
  //   });
  // },


// Update by Query
// localhost:3000/product?id=1&name=food

  updateQuery: function(req,res) {
    db.product.update(req.query, function(err, response){
      if(err) {
        res.send(err);
      }
      res.send(response);
    });
  },

  deleteProductId: function(req, res) {
    db.delete_product(req.params.productId, function(err, response){
      if(err) {
        res.send(err);
      }
      res.sendStatus(200);
    });
  }
};
