
const path= require('path');
const fs=require('fs')

const express= require ('express');

const cors=require('cors');
const morgan= require('morgan')
const helmet= require('helmet')
const compression= require('compression')
const dotenv= require('dotenv')
dotenv.config();

const sequelize = require('./util/database');

const User=require('./models/users');

const Expense = require('./models/expenses');

const Order = require('./models/orders')

const Forgotpassword=require('./models/forgotpassword');

const Report = require('./models/reportdownload');

const app=express();

app.use(cors());

// const dotenv= require('dotenv')
// dotenv.config();

app.use(helmet())         //middleware

app.use(compression())      // middleware


const accessLogStream=fs.createWriteStream(path.join(__dirname, 'access.log'),{flags:'a'})             //flags is a-->new data to be apended not override the wexiting file..but added at the end of the file..so we dont have 1 log statement in the file continously add the file..this writestream can be use by morgan..  
//app.use(morgan('combined'))                                                                  // for console
app.use(morgan('combined',{stream:accessLogStream}))                                          // for file store


const bodyParser = require('body-parser');
app.use(bodyParser.json({extended:false}));

const userRoutes =require('./routes/user.js');
app.use('/user', userRoutes);

const expenseRoutes =require('./routes/expense.js');
app.use('/expense', expenseRoutes);

const purchaseRoutes = require('./routes/purchase');
app.use('/purchase', purchaseRoutes);

const premiumRoutes = require('./routes/premium');
app.use('/premium', premiumRoutes);

const resetPasswordRoutes = require('./routes/resetpassword');
app.use('/password', resetPasswordRoutes);



User.hasMany(Expense);
Expense.belongsTo(User);                                        // primary key of the user table will assign in expense table as foreign key in expense table

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(Report);
Report.belongsTo(User);



sequelize
       .sync()
       //.sync({force:true})                 //-->it will delete stuff 
         .then((result)=>{
            app.listen(3000);
         })
         .catch((err)=>{
            console.log(err);
         });
