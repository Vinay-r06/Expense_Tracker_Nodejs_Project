const User = require('../models/users');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');



exports.getUserLeaderBoard = async (req,res)=>{
    try{
    const users = await User.findAll()
    const expenses = await Expense.findAll();
    userAggregatedExpense={}
    expenses.forEach((expense)=>{
        if(userAggregatedExpense[expense.userId]){
            userAggregatedExpense[expense.userId] += expense.expenseamount
        }else{
            userAggregatedExpense[expense.userId] = expense.expenseamount
        }
    })
    var userLeaderBoardDetails=[];
    users.forEach((user)=>{
        userLeaderBoardDetails.push({name:user.name,total_cost:userAggregatedExpense[user.id] || 0})
    })
    userLeaderBoardDetails.sort((a,b)=>b.total_cost - a.total_cost);
    res.status(200).json(userLeaderBoardDetails)
    }
    catch(err){
     console.log(err)
     res.status(500).json(err)
    }
}