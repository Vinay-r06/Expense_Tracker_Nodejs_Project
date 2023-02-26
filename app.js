const express= require ('express');
const app=express();

const cors=require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json({extended:false}));

const userRoutes =require('./routes/user.js');
app.use('/user', userRoutes);




const sequelize = require('./util/database');

sequelize
       .sync()
        //.sync({froce:true})
         .then((result)=>{
            app.listen(3000);
         })
         .catch((err)=>{
            console.log(err);
         });