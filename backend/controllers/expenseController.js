const db = require('../config/db');

const addExpense = (req, res) => {

    const { title, amount, category } = req.body;

    const query = `
    INSERT INTO expenses(title, amount, category)
    VALUES (?, ?, ?)
    `;

    db.query(
        query,
        [title, amount, category],
        (err, result) => {

            if(err){
                console.log(err);

                return res.status(500).json({
                    message:"Error adding expense"
                });
            }

            res.status(201).json({
                message:"Expense added successfully"
            });

        }
    );

};


const getExpenses=(req,res)=>{

    const query="SELECT * FROM expenses";

    db.query(query,(err,result)=>{

        if(err){

            return res.status(500).json({
                message:"Error fetching data"
            });

        }

        res.status(200).json(result);

    });

};


const deleteExpense=(req,res)=>{

    const id=req.params.id;

    const query=
    "DELETE FROM expenses WHERE id=?";

    db.query(query,[id],(err,result)=>{

        if(err){

            return res.status(500).json({
                message:"Delete failed"
            });

        }

        res.status(200).json({
            message:"Expense deleted"
        });

    });

};

const updateExpense=(req,res)=>{

    const id=req.params.id;

    const {
        title,
        amount,
        category
    }=req.body;

    const query=
    `UPDATE expenses
     SET title=?,
     amount=?,
     category=?
     WHERE id=?`;

    db.query(
        query,
        [title,amount,category,id],
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    message:"Update failed"
                });

            }

            res.status(200).json({
                message:"Expense updated"
            });

        }
    );

};

module.exports={addExpense, getExpenses, deleteExpense, updateExpense};