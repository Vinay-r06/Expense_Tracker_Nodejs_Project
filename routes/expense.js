const express= require('express');

const router = express.Router();

const userController= require('../controllers/expense');

//router.get('/allExpense', userController.allExpense);

router.post('/addExpense', userController.addExpense);

router.get('/getExpense', userController.getExpense);

router.delete('/deleteExpense/:expenseid', userController.deleteExpense);


module.exports=router; 

