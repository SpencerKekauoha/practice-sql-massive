var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var connectString = 'postgres://spencerkekauoha@localhost/massive_node';

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

var massiveInstance = massive.connectSync({connectionString : connectString});
app.set('db', massiveInstance);

var productsCtrl = require('./productsCtrl');
var db = app.get('db');

//CRUD ENDPOINTS

app.get('/products', productsCtrl.readProducts);
app.get('/product/:productId', productsCtrl.readProductId);
app.post('/products', productsCtrl.createProduct);
app.put('/product/:productId', productsCtrl.updateProductId);
app.delete('/product/:productId', productsCtrl.deleteProductId);
// Update by Query
app.put('/product', productsCtrl.updateQuery);

app.listen('3000', function(){
  console.log("Successfully listening on : 3000");
});
