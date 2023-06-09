const mysql = require('mysql'); 
 
// กำหนดการเชื่อมต่อฐานข้อมูล
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'testnode'
  });

// ทำการเชื่อมต่อกับฐานข้อมูล 
connection.connect(function(err){
  if (err) throw err
  console.log('You are now connected with mysql database...');
});

module.exports = connection;