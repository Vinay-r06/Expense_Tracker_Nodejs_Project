const Sequelize= require('sequelize');

const sequelize = new Sequelize(
                    'expense-node', 
                    'root',
                    'Mysql0602@', {
             dialect: 'mysql',
             host: 'localhost'
        }
          )                 

module.exports=sequelize;


// this is the new db scheme ...u have to create