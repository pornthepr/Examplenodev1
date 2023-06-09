const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

var books = [
    {"id":"1","title":"C programming"},
    {"id":"2", "title":"JAVA programming"}
];

app.post('/book',(req,res)=>{
    books.push(req.body);
    res.send(req.body);
});

app.get('/',(req,res)=>{
    res.send("Hello world from root");
});
app.get('/books',(req,res)=>{
    res.json(books);
});
app.get('/book/:id',(req,res)=>{
    //res.send("Book id : " + req.params.id);
    res.send(books.find(books=>books.id==req.params.id));
});

app.listen(3000,()=>{
    console.log("Listen on port 3000 .... ");
});