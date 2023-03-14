const express= require('express');

const router = express.Router();

const userController= require('../controllers/expense');

const userauthentication=require('../middleware/auth');



router.post('/addExpense', userauthentication.authenticate, userController.addExpense);

router.get('/getExpense', userauthentication.authenticate, userController.getExpense);

router.delete('/deleteExpense/:expenseid', userauthentication.authenticate, userController.deleteExpense);


module.exports=router; 

