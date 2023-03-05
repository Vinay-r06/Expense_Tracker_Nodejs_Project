const path= require('path');

const express= require ('express');

const cors=require('cors');

const sequelize = require('./util/database');

const User=require('./models/users');

const Expense = require('./models/expenses');


const app=express();

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json({extended:false}));

const userRoutes =require('./routes/user.js');
app.use('/user', userRoutes);

const expenseRoutes =require('./routes/expense.js');
app.use('/expense', expenseRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);                                        // primary key of the user table will assign in expense table as foreign key in expense table



sequelize
       .sync()
        //.sync({force:true})                 //-->it will delete stuff 
         .then((result)=>{
            app.listen(3000);
         })
         .catch((err)=>{
            console.log(err);
         });




// daily expense app with user authentication...

// vt---> saving expense the right way in database,,

//to authentication task

//1st
// u should know which expense is which user..

// each user had multiple expense...
// one particular expense(one row expense) particular one  user..
// so this the one to many relationship..
// so u should put "userid" column to expense table..

// one to many-->u will do it through foreign key 
// how?
// u will take primary key of users table--> it had info abt user name, email id,password, id...
// and put it in the expense Table..
//now will get know the who added which expense..
// the expenses should have a relationship with the user table
// who is added the expense that should be saved..

// means--> means putting the primary key of the of this user table into the expense table as foreign key..

//User.hasMany(Expense);
//Expense.belongsTo(User);         --> this two line called association ...automaticaly added....this done by sequilze  

// 2nd -- who logged in..

//frontend needs to inform the backend..the backend doesnt know...backend is not saving anything anywhere..
//backend doesnt know who is sending the expenses..

// there is 2 way....

// one is --->while posting adding "userid"....the userid will get when u looged in..

// ----algorithm:

// when the user login 
// u will get id..

// store in local storage--> id..

//post -->{
     // expense,                                          // u can get from the body for post...can pass it on the body
   // userid:localStorage.getItem('userID')
// }
 // Headers: userId.




// get--->                          // but get request u dont have body...u cant pass it on the body...here there is no body..

// axios.setHead

// deleteexpense--> userId




// so to overcome this we "headers"

// in post and get--> once we set header u can send one shot....u can set the header once..and use it every where..-->axios.setHead..
// so u dont have to put it in body..do that dirty work again and again..
// and also u can pass it normally..
// once u set header..for get request post request all request it will handle all requests...in headers u pass the "userid"...

// but here we had problem--->if i know u r userid...
// in real world userid will get easily...
// i got userid...i will call delete expense with the userid...how?--> header set ..and call delete
// once we get userid from backend..u can do it... delete and post whatever with userid...


// vt-->why dont we use userID to talk between frontend and backend directly...

// we know cant use userid..
//we cant pass the userid in the payload or in the headers for the backend to know..this user is entered..


// we should use userid and encrypt with secret key....means we encrpyt userid and we kind of create a  secret key..
// we mix the secret key and userid and then encrypt...
// we cant use bcrrpt-->because it is one way..we cant come back...> userid-->bcrpyt-->we get hash..but we cant go back from hash...

// so we use encrpyt
// userid + secret key--> encryption--> we get token.....where screct key saved in the backend

// token is nothing but--> a screct pass..
// once u logged in u get screct pass(token)...u can use this screct pass again and again

// where screct key saved in the backend somewhere..
// u will send any requests in the headers of that request i will be sending token..

// header--> token

// in backend i will take this token from the header..and then i will decrpyt it with secret key

// token + decrpyt it with secret key--> once decrpyt--> u will get id..userid



// there will be 2 possible--> if someone token is tampered..removed secret key
// if u decrypt the secret key an error will come..it will not decrpypt..throw error..
// if the token is correct... u try decrypt it will get the userid...

//....u should not share secret key
// token is u r srerect...for user this is a scret key to access the backend

// this mechanism used for login...token is asecret key ...





// vt--> how to generate the secret token and saving it in local storage..

// we use "decrypt" this was a library...
// here we had a library called "json web token"-->jwt

// jwt takes 2 arguments..
// 1 is payload--> u should encrypt
// 2 is secret key---> which u want encrypt it..(u should not share secret key)

// to encrpyt u can use anything in payload...u can put anything in "object"..here i will give "id"..
// jwt--> had 3 parts
// header , body, and footer..





// vt-->how to use the token to identify the user and get only his expense..


//next()---> it will flow to the next function


// understanding thoughts...

// while encrpt 
// starts with --> login
// when login success --in backend controller ..u will encrpt with jwt and with given input id and name...to jwt and in response u will set encrpt value to --token variable...

// and when login success in backend controller... comes back to login js and we set token in "localstorage" for furtuer use means we want set this token in headers



// in frontend we access that localstorage token and while posting or delete we pass that token in  object headers and set that token value..in req headers...

// this req headers token value.. will take and verify for decrpytion ...in middleware of authentication js file...

// in authentication we decrpyt by access the req.headers and verify by "secretkey" with token value(authorization) in headers it will there id and name....

// after decpryt u will get both name and id....u access only "id" and search that id in user table by "findbyPk" and that id refer the row which all information in user table....
// to access the id in that row---> u want user ".id".....here we saved in req.user---> because req is global for middleware which in router we had two middleware which is common for both...

 
// whenever add expense , delete or get  expense u will mention id which u decrypt that id, expense will add in  expense table with user id refers which users that expense. 
