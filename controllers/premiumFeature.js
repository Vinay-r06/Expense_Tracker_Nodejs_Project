const User = require('../models/users');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');


// group by method (how to use findAll smartly)

// exports.getUserLeaderBoard = async (req,res)=>{
//     try{
//     const users = await User.findAll({
//         attributes: ['id', 'name']
//     })
//     const userAggregatedExpense = await Expense.findAll({
//         attributes: ['userId', [sequelize.fn('sum', sequelize.col('expenses.expenseamount')), 'total_cost']],
//         group : ['userID']
//     });
   
//     var userLeaderBoardDetails=[];
//     users.forEach((user)=>{
//         userLeaderBoardDetails.push({ name: user.name, total_cost: userAggregatedExpense[user.id] || 0})
//     })
//     console.log(userLeaderBoardDetails)
//     userLeaderBoardDetails.sort((a,b)=>b.total_cost - a.total_cost);
//     res.status(200).json(userAggregatedExpense)
//     }
//     catch(err){
//      console.log(err)
//      res.status(500).json(err)
//     }
// }




 // join by method-- production level (optimization)


// exports.getUserLeaderBoard = async (req,res)=>{
//     try{
//     const leaderboardofusers = await User.findAll({
//         attributes: ['id', "name", [sequelize.fn('sum', sequelize.col('expenses.expenseamount')), 'total_cost']],
//         include:[                                                                  // joins
//             { 
//                 model: Expense,
//                 attributes: [] 
//             }
//         ],
//         group : ['user.id'],                                                      // since expense has few userid...in user table had all user...so user.id
//         order: [['total_cost', 'DESC']]  
//     });
    
//     res.status(200).json(leaderboardofusers)
//     }
//     catch(err){
//      console.log(err)
//      res.status(500).json(err)
//     }
// }



// final leaderboard optimization


exports.getUserLeaderBoard = async (req,res)=>{
    try{
    const leaderboardofusers = await User.findAll({
        order: [['totalExpenses', 'DESC']]  
    });
    
    res.status(200).json(leaderboardofusers)
    }
    catch(err){
     console.log(err)
     res.status(500).json(err)
    }
}




// algorthim

// Users -> finding their respective expense 
// 1m -> total expense                                 // this will take slow when adding when users had 1million 


// user table - totalExpense                           // so we calucalte all expense in new created totalExpense

// totalExpense

// User create a new expense -> expenseamount

// total Expense = totalExpense + expenseamount





// code changed... final leaderboard optimization

// added column "totalExpense" in user model database
// in expense controller.. added logic for adding "when expense is created"
// in premiuimfeauture controller-> change code..