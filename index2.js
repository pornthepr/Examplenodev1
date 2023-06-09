var express = require('express');

var app = express();
const connection = require('./config/connection');

//start body-parser configuration
app.use(express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//end body-parser configuration

//create app server
var server = app.listen(3000,  function () {
    console.log("Listen on port 3000 .... ");
});

//rest api to get all customers
app.get('/customers', (req, res) => {
  let sql = 'select * from customer';
  connection.query(sql, (error, results, fields) => {
	  if (error) throw error;
    res.json(results);
	});
});
//rest api to get a single customer data
app.get('/customer/:id', (req, res) => {
  let sql = 'select * from customer where Id='+ [req.params.id];
  connection.query(sql, (error, results, fields) => {
	  if (error) throw error;
    res.json(results);
	});
});

//rest api to create a new customer record into mysql database
app.post('/customer', (req, res) => {
  let user = {
    "name":req.body.name,
    "address":req.body.address, 
    "country":req.body.country, 
    "phone":req.body.phone
  };
   let sql = 'INSERT INTO customer SET ?';
   console.log(sql);
   connection.query(sql,user, (error, results, fields) => {
	  if (error) throw error;
	  res.json(results);
	});
});

//rest api to update record into mysql database
app.put('/customer/:id', (req, res) => {
  //console.log(req.body);
  let user = {
    "name":req.body.name,
    "address":req.body.address, 
    "country":req.body.country, 
    "phone":req.body.phone
  };
  let sql = 'UPDATE customer SET ? where id=?';
  connection.query(sql, [user, req.params.id], (error, results, fields) => {
	  if (error) throw error;
    console.log(sql);
	  res.json(results);
	});
});

//rest api to delete record from mysql database
app.delete('/customer/:id',(req,res)=>{
  console.log(req.params.id);
  let sql = 'DELETE FROM customer WHERE id='+[req.params.id];
  connection.query(sql, (error, results, fields) => {
   if (error) throw error;
   res.end('Record has been deleted!');
 });
 
});
