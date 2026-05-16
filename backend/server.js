const express = require('express'); 
const cors = require('cors');

const db = require('./config/db');

const expenseRoutes=require('./routes/expenseRoutes');
const app = express();

app.use(cors()); app.use(express.json());

app.use('/api/expenses',expenseRoutes);
app.get('/',(req,res)=>{ res.send('Expense Tracker Backend Running'); });

const PORT=5000;

app.listen(PORT,()=>{ console.log("Server running on port ${PORT}"); });