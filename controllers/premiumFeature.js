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


exports.getUserLeaderBoard = async (req,res)=>{
    try{
    const leaderboardofusers = await User.findAll({
        attributes: ['id', "name", [sequelize.fn('sum', sequelize.col('expenses.expenseamount')), 'total_cost']],
        include:[                                                                  // joins
            { 
                model: Expense,
                attributes: [] 
            }
        ],
        group : ['user.id'],                                                      // since expense has few userid...in user table had all user...so user.id
        order: [['total_cost', 'DESC']]  
    });
    
    res.status(200).json(leaderboardofusers)
    }
    catch(err){
     console.log(err)
     res.status(500).json(err)
    }
}


/// inner join -- when two tables has same name that will come out...
// left join - when table 1  will be there and table 2 which has same as in table 2 will come only matched name in table 2..
// right join-- opposite of left join
// full outer join-- all (union)
