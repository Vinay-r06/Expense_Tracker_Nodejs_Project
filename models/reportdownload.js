const Sequelize = require('sequelize');

const sequelize= require('../util/database');

const Report= sequelize.define('report',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    fileUrl:Sequelize.STRING,
        
})

module.exports=Report;