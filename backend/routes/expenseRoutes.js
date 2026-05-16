const express=require('express');

const router=express.Router();

const {
 addExpense,
 getExpenses,
 deleteExpense,
 updateExpense
}=require('../controllers/expenseController');


router.post('/add',addExpense);
router.get('/all',getExpenses);
router.delete('/delete/:id',deleteExpense);
router.put('/update/:id',updateExpense);

module.exports=router;