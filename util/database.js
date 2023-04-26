const Sequelize= require('sequelize');

// const dotenv= require('dotenv')
// dotenv.config();


const sequelize = new Sequelize(
                   process.env.DB_NAME,  
                   process.env.DB_USERNAME,
                   process.env.DB_PASSWORD, {
             dialect: 'mysql',
             host:  process.env.DB_HOST
        }
          )                 

module.exports=sequelize;


// this is the new db scheme ...u have to create