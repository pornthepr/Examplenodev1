const express = require('express');
const mysql = require('mysql');

var cors = require('cors');
const app = express();

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'testnode'
  });

app.use(express.json()); //แปลงข้อมูลที่มีรูปแบบ JSON String ให้อยู่ในรูป JSON Object
app.use(cors()); //CORS เป็นกลไกที่ web browser ใช้เวลาที่ client ส่ง request ไปยัง server ที่มี domain ต่างกัน
app.use(express.urlencoded({extended:true})); //// แปลงข้อมูลจาก form ในรูปแบบ url encode เป็น Object
  
// ทำการเชื่อมต่อกับฐานข้อมูล 
connection.connect(function(err){
  if (err) throw err
  console.log('You are now connected with mysql database...');
});

app.listen(3000,()=>{
    console.log("Listen on port 3000 .... ");
});

app.get('/customers', (req,res)=>{
    connection.query('SELECT * FROM customer',(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    })
})

app.get('/customersyear', (req,res)=>{
    connection.query('SELECT * FROM customer WHERE YEAR(Created_on) = ?',[req.body.year],(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    })
})

app.get('/customer/:id', (req,res)=>{
    connection.query('SELECT * FROM customer WHERE id=?',[req.params.id],(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    })
})

app.post('/customer',(req,res)=>{
    let params = req.body;
    //console.log(params);
    connection.query('INSERT INTO customer SET ?',params,(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    })
});

app.delete('/customer/:id',(req,res)=>{
    connection.query('DELETE FROM customer WHERE id = ?',[req.params.id],(err,results,fields)=>{
        if(err) throw err;
        res.end('Record has been deleted...');
    })
});

app.put('/customer',(req,res)=>{
    connection.query('UPDATE customer SET Name=?, Address=?, Country=?, Phone=? WHERE Id = ?',[req.body.name,req.body.address,req.body.country,req.body.phone,req.body.id],(err,results,fields)=>{
        if(err)throw err;
        res.json(results);
    })

});


// Callback function หรือฟังก์ชันเรียกกลับ คือฟังก์ชันที่ถูกส่งเป็นพารามิเตอร์ของฟังก์ชันอื่นเพื่อเรียกใช้งานในภายหลัง 
// http://marcuscode.com/lang/javascript/callback-function












