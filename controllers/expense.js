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
  const page=+req.query.page || 1;
  const limit=+req.query.limit  || 3
  const response= await Expense.findAll({where:{userId:req.user.id},
                                         offset:(page-1)*limit,
                                        limit:limit})
  const allData=await Expense.findAll({where:{userId:req.user.id}})
  console.log('length>>', allData.length)
  return res.status(200).json({allExpense:response,
                                //allData:allData, 
                               hasnextpage:(limit*page<allData.length),
                               nextpage:page+1,
                               currentpage:page,
                               haspreviouspage:page>1,
                               previouspage:page-1,
                               success:true
                              })
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






exports.downloadExpense= async (req,res)=>{
try{
 const expenses = await UserServices.getExpenses(req);          // if wanyt where u can add..to get sepcific expense using id
 console.log(expenses)
 const stringfiedExpense= JSON.stringify({expenses})
                                                              // each time while downloading i am getting same file means overriding,,,so to download new we will use userid and date...
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