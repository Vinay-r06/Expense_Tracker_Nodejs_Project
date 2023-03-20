const Sequelize = require('sequelize');

const sequelize= require('../util/database');

const User= sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name: Sequelize.STRING,
    
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:Sequelize.STRING,
    ispremiumuser:Sequelize.BOOLEAN,
    totalExpenses: {
        type:Sequelize.INTEGER,
        defaultValue:0,
    }
})

module.exports=User;




// adding column called "totalExpense" for final optimazation
// 







// email should unique here... 
// id is primary key
// email never be primary key
// reason -->email is private people..u can not use it as primary key...because if u start using primary key u will have to save it in multiple places...
// u came to know where well to save the emailid and it could be dangers and it could get leaked..
// that y u never store email...u will store id...
// id always a primary key