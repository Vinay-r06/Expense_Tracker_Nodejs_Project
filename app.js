const path= require('path');

const express= require ('express');

const cors=require('cors');

const sequelize = require('./util/database');

const User=require('./models/users');

const Expense = require('./models/expenses');

const Order = require('./models/orders')

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


User.hasMany(Expense);
Expense.belongsTo(User);                                        // primary key of the user table will assign in expense table as foreign key in expense table

User.hasMany(Order);
Order.belongsTo(User);

sequelize
       .sync()
       //.sync({force:true})                 //-->it will delete stuff 
         .then((result)=>{
            app.listen(3000);
         })
         .catch((err)=>{
            console.log(err);
         });




// Its time to make money

// algorthim part 1

// 1) create an account in Razorpay - razropay.com
// 2) API Key
//    key Id

// 3)  Buy premium-->button click
// 4) call u r own backend api(sharpener api)          // because in front end it is editable..
//     -- > call razropay (API Key, key id)           // call razropay url

//                                         razorpay will gets know-->there is order in sharpener to create      
//   sepify     -->     amount 
//              -->    currency

// now in razropay brain an orderid will created now and order will asscoiated with sharpener..

//    --> order id--"sdsfsfdd"
//    --> send a success response , orderid
//    -->we pass this orderid  to razropay
//               screen opens
//          -->how much needs to be paid
//          -->what is the currency
//   ---> callback function is also passed to razropay
//          --> ()=> axios.post('localhost:3000/buypremiuim/success) 








// from the backend i made a request to razorpay
// sent amount and currency

// razorpay understands yav techn which is trying to create a payment request..
// on ce i get order id from frontend....from the frontend only i pass the ordinary to razorpay..
// then only screen opens razropay payment
// order cannot be tampered..it is encrpyted with string..
// so by this raxoropay identify  25 rs need to charge..









// how do we create an order on razorpay --razorpay integration part-1


// each user has many order
// each order belongs to each user.
// it is basically one to many relationship..

// when click byprenium--i call my backend this in turns calls razorpay...and razorpay returns orderid and some information created time and all... 
// the orderid comes to the frontend and calls the razorpay frontend and razorpay will open to payment
// the frontend comes to 25 rs by orderid...

// how razropay handles payment...

// working flow

// when user click on the buy premuim button,, the backend kind of gets informed this users is trying to create an order..
// we try to inform razorpay that an order is getting created...we call razropay url...
// and we create an order in razropay dashboard itself ..
// once razropay has created the order it returns an order Id which is unique order Id..
// once we get the orderID ...we save it in our own table...(ther order still in pending state not paid..its just been registered with key.. this kind of an order this user is trying to create ,, can u open frontend for payment)..  
// order Id razropay is created..now in database also we saved this order...order ID....with status of pending state..not completed
// then we return order id to the frontend along with key Id....(order iD and KEY id(unique ID) to frontend)


// in the front it will price after email sumbit ... because i passed orderId..and then this frontend end is called razropay backend and everthing..

// for if payment success my frontend needs to backend... i will use handler call back function...once the payment is succcessful..this handler function will be automatically called...
// i am inform this particular order Id willl be order id: and razropay id....and also token authorization which person is buying..
// from the frontend only i will pass the handler function to razropay...






// on successful payment

// algorthim part 2

// 1) save the payment id properly
// 2)order status --> Pending to suuccessful
       // if fails--> pending to failed                                // even when payment fails..user again want to pay u want  to create new order Id
                                                                     // when everytime u click "buy premiuim" ordeer id gets created.... if payment suuccesful pensind become suuccessful...if payment fails pending become failed...remain pending..failed
// 3) covert to User to premium User    
//    --> save it in-- User table Ispreimiumuser                      // in user table u should add ispremiuimuser column--boolean (0 or 1)   
