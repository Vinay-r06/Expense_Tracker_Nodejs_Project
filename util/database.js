const Sequelize= require('sequelize');

//const dotenv= require('dotenv')



// delete process.env.DB_NAME
// delete process.env.DB_USERNAME
// delete process.env.DB_PASSWORD
// delete process.env.DB_HOST
const dotenv= require('dotenv')
dotenv.config();

const sequelize = new Sequelize(
                   process.env.DB_NAME, 
                   process.env.DB_USERNAME,
                   process.env.DB_PASSWORD, {
             dialect: 'mysql',
             host:  process.env.DB_HOST
        }
          )  
          console.log(process.env.DB_NAME)  
          console.log(process.env.DB_USERNAME,)
          console.log(process.env.DB_PASSWORD)
          console.log(process.env.DB_HOST)             

module.exports=sequelize;


// this is the new db scheme ...u have to create