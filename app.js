const express = require('express');
const bodyParser = require('body-parser');
const user = require('./userService/app')


const app = express();
app.listen(3000);


app.use(bodyParser.json());

app.get('/users',(req,res)=>{
    user.userGet(req,res);
})

app.get('/users/:id',(req,res)=>{
    user.userWithId(req,res);
})

app.post('/users/register',(req,res)=>{
    user.userRegister(req,res);
})

app.put('/users/:id',(req,res)=>{
    user.userUpdate(req,res);
})

app.delete('/users/:id',(req,res)=>{
    user.userDelete(req,res);
})