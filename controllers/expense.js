const Expense = require('../models/expense');

function isstringinvalid(string){
  if(string==undefined || string.length===0){
      return true
  } else{
      return false
  }
}

exports.addExpense= async (req,res)=>{
    try{

        const {expenseamount, category, description}= req.body;

        if(isstringinvalid(expenseamount) || isstringinvalid(category) || isstringinvalid(description)){
          return res.status(400).json({success:false, message: 'parameter missing'})
       }     

  const response= await Expense.create({expenseamount, category, description})
  return res.status(201).json({newexpense:response, success:true, message: "Added Successfully"})
    }catch(err){
     return res.status(500).json({success:false, error:err})
    }
}

exports.getExpense= async (req,res)=>{
try{
  const response= await Expense.findAll()
  return res.status(200).json({allExpense:response, success:true})
   }
    catch(err){
     return res.status(500).json({success:false, error:err})
    }
  }


exports.deleteExpense= async (req,res)=>{
  try{
        const expenseid=req.params.expenseid;
        
        if(expenseid==undefined || expenseid.length===0){
            return res.status(400).json({success:false})
               }

  const response= Expense.destroy({ where:{ id: expenseid} })
  if(response===0){
    return res.status(404).json({success:false, message: 'expense does not belong to the user'})
  }
  return res.status(200).json({success:true, message:'deleted Successfully'})
  }    
    catch(err){
     return res.status(500).json({success:false, message:'Failed'})
    }
}
