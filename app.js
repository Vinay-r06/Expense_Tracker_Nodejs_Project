const path= require('path');

const express= require ('express');

const cors=require('cors');

const sequelize = require('./util/database');

const User=require('./models/users');

const Expense = require('./models/expenses');

const Order = require('./models/orders')

const Forgotpassword=require('./models/forgotpassword');

const app=express();

app.use(cors());

const dotenv= require('dotenv')

dotenv.config();

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

sequelize
       .sync()
       //.sync({force:true})                 //-->it will delete stuff 
         .then((result)=>{
            app.listen(3000);
         })
         .catch((err)=>{
            console.log(err);
         });




// Premium account features


// algorthim

// from the backend which u r going to send in that u r going to send if he is private user or not..
// in the frontend u r going to decode it..decode the token..
// by this u can know it is premiuim user or not..
// if premium user then show that message..


// changes made in code-->

// first save it in local storage which in backend to frontend
// while login add ispremiumuser to encode while encoding
// stackofl-->copy code and paste in frontend
// and check by--> if 


// adding expense leader board 

// in frontend:

// show the leaderboard button- Dom manipulation..
// when u click on this button a api call should happen
// u will get the data in soreted order from backend..
// do dom manipulation and show the data..


// backend

// create a new route -> /premiuim/showleaderboard
// find all the expense and then group by unique user id                  // from the expense table u have to user id
// i need the name of the user                                            
// query the user table..                                                  // FROM THE USER ID U have to user id and name and then merge them..

// running 2 queries is obviously slow..