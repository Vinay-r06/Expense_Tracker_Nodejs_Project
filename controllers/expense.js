const Expense = require('../models/expenses');
const User = require('../models/users')
const sequelize = require('../util/database')
                                                                              //const AWS=require('aws-sdk');
const UserServices= require('../services/userservices');
const S3Services= require('../services/S3services');
const Report = require('../models/reportdownload');
require('dotenv').config();





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



// function uploadToS3(data,filename){
// const bucket_name='expensestrackers3rahul';
// const iam_User_key="AKIARVN2ZV3N6LZHOGAS";
// const secret_key="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";


// let s3bucket= new AWS.S3({
//   region:'us-east-1',
//   accessKeyId:iam_User_key,
//   secretAccessKey:secret_key,
// })

//   var params={
//     Bucket:bucket_name,
//     Key:filename,
//     Body:data,
//     ACL: 'public-read'
//   }
//   return new Promise((resolve, reject)=>{
//     s3bucket.upload(params, (err,s3response)=>{            // this is asyncronous task
//       if(err){
//         console.log('something went wrong', err)
//         reject(err)                                       // if it rejects it will go to catch block below code
//       }else{
//         console.log('success', s3response);
//         resolve (s3response.Location)
//       }
//     })
//   })
// }



exports.downloadExpense= async (req,res)=>{
try{
 const expenses = await UserServices.getExpenses(req);          // if wanyt where u can add..to get sepcific expense using id
 console.log(expenses)
 const stringfiedExpense= JSON.stringify({expenses})
 // each time while downloading i amgetting same file means overriding,,,so to download new we will use userid and date...
 const userId= req.user.id;

 const filename=`expensesrahul${userId}/${new Date()}.txt`;            // added date and userId in file name... i will get new file when downloading...
 const fileUrl = await S3Services.uploadToS3(stringfiedExpense, filename)            // since uploadToS3() is asyncronous task it will put call back quese moved to next line... i will get fileurl.. so i will do to wait for the task complete uploadToS3()..so i will use await with promise call back.. 
 console.log(fileUrl);

 const report= await Report.create({
                                   fileUrl:fileUrl,
                                   userId:req.user.id
 })
 res.status(200).json({fileUrl,response:report, success:true, message: "downloaded Successfully"})
 
}catch(err){
console.log(err)
return res.status(500).json({fileUrl:'', success:false, message:'Failed', err:err})
}

}

exports.downloadHistory= async (req,res)=>{
  try{
    const download= await Report.findAll({where:{userId:req.user.id}})
    res.status(200).json({success:true, downloadReport:download})

}catch(err){
  console.log(err)
  return res.status(500).json({fileUrl:'', success:false, message:'Failed', err:err})
  }
  
  }
  



// code changed 

// download expense 