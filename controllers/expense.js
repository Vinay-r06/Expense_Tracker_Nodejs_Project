const Expense = require('../models/expenses');
const User = require('../models/users')
const sequelize = require('../util/database')


function isstringinvalid(string){
  if(string==undefined || string.length===0){
      return true
  } else{
      return false
  }
}

// without transaction  (when 2 database is working inside database is failed but outside is success and database in added data and second database is not updated to overcome this we use transaction if one fails it rolls back it will not add data to databse)

// exports.addExpense= async (req,res)=>{
  
                                                                           
//     const {expenseamount, category, description}= req.body;

//     if(isstringinvalid(expenseamount) || isstringinvalid(category) || isstringinvalid(description)){
//       return res.status(400).json({success:false, message: 'parameter missing'})
//    }    

// // u can use this or below//   req.user.createExpense({expenseamount, category, description})----> this magic function by sequelize
// Expense.create({expenseamount, category, description,userId: req.user.id})
//               .then(expense=>{
//                 var totalExpense = Number(req.user.totalExpenses) + Number(expenseamount)
//                 console.log("total>>",totalExpense)
//                User.update({
//                   totalExpenses: totalExpense
//                 },{
//                   where: {id: req.user.id},
//                 })
//                 .then(async()=>{
//                   res.status(200).json({newexpense:expense, success:true, message: "Added Successfully"})
//                 })
//                 .catch(async(err)=>{
//                   return res.status(500).json({success:false, error:err})
//                 })
//               }).catch(async(err)=>{
//                 return res.status(500).json({success : false, error:err})
//               })

//           }



 // wit transaction  


// exports.addExpense= async (req,res)=>{
//       const t= await sequelize.transaction();                                  // creating transaction object
                                                                              
//         const {expenseamount, category, description}= req.body;

//         if(isstringinvalid(expenseamount) || isstringinvalid(category) || isstringinvalid(description)){
//           return res.status(400).json({success:false, message: 'parameter missing'})
//        }    

//  // u can use this or below//   req.user.createExpense({expenseamount, category, description})----> this magic function by sequelize
//    Expense.create({expenseamount, category, description,userId: req.user.id},{transaction:t})          // added transaction
//                   .then(expense=>{
//                     var totalExpense = Number(req.user.totalExpenses) + Number(expenseamount)
//                     console.log("total>>",totalExpense)
//                    User.update({
//                       totalExpenses: totalExpense
//                     },{
//                       where: {id: req.user.id},
//                       transaction:t                                                                             // added transaction
//                     })
//                     .then(async()=>{
//                       await t.commit();
//                       res.status(200).json({newexpense:expense, success:true, message: "Added Successfully"})
//                     })
//                     .catch(async(err)=>{
//                       await t.rollback();
//                       return res.status(500).json({success:false, error:err})
//                     })
//                   }).catch(async(err)=>{
//                     await t.rollback();
//                     return res.status(500).json({success : false, error:err})
//                   })
    
//               }



// transaction with async and await


exports.addExpense= async (req,res)=>{
const t= await sequelize.transaction();                                  // creating transaction object

try{                                                                                 
const {expenseamount, category, description}= req.body;
          
if(isstringinvalid(expenseamount) || isstringinvalid(category) || isstringinvalid(description)){
return res.status(400).json({success:false, message: 'parameter missing'})
}    
          
           // u can use this or below//   req.user.createExpense({expenseamount, category, description})----> this magic function by sequelize
const expense= await Expense.create({expenseamount, category, description,userId: req.user.id},{transaction:t})          // added transaction
var totalExpense = Number(req.user.totalExpenses) + Number(expenseamount)
await User.update({
      totalExpenses: totalExpense
      },{
     where: {id: req.user.id},
     transaction:t                                                                             // added transaction
    })
    await t.commit();
    res.status(200).json({newexpense:expense, success:true, message: "Added Successfully"})
    }
    catch(err){
    await t.rollback();
    return res.status(500).json({success:false, error:err})
    }
    }


exports.getExpense= async (req,res)=>{
try{
  const response= await Expense.findAll({where:{userId:req.user.id}})
  return res.status(200).json({allExpense:response, success:true})
   }
    catch(err){
     return res.status(500).json({success:false, error:err})
    }
  }


exports.deleteExpense= async (req,res)=>{
  const t= await sequelize.transaction(); 
  try{

        const expenseid=req.params.expenseid;
        const resp= await Expense.findOne({
          where:{id:expenseid},
          transaction:t
        })
        
        if(expenseid==undefined || expenseid.length===0){
            return res.status(400).json({success:false})
               }

  const response= await Expense.destroy({ where:{ id: expenseid, userId:req.user.id}},{transaction:t})
  const totalExpense = Number(req.user.totalExpenses) - Number(resp.expenseamount)
  await  User.update({
           totalExpenses:totalExpense
  },{
    where: {id: req.user.id},
    transaction:t 
  })
  await t.commit();
  return res.status(200).json({response:response,success:true, message:'deleted Successfully'})
  }    
    catch(err){
      await t.rollback();
     return res.status(500).json({success:false, message:'Failed'})
    }
}






// Making Expense App Production ready

// transaction concept
// whenever u do post request u need to use transaction
// get request u dont need it
// this transaction concept will used in production alot...

// u should put transaction where u posted each and every post

// this transaction keeps track, whereever u updating database, u can pass this transaction, so it will track, in case anything fails it will rollback..
// if everthing goes good it will commit.

// it will try to create aggregations of quiers to be run and when u write "t.commit" it is ready to run...u dont write "t.commit" it will not run, means it will not update the database..

// code changed 

// expense controller import transaction