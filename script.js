loadExpenses();

const addBtn = document.getElementById('addBtn');

addBtn.addEventListener(
'click',
addExpense
);

document
.getElementById(
'filterCategory'
)
.addEventListener(
'change',
loadExpenses
);


async function addExpense(){

const title=
document.getElementById('title').value;

const amount=
document.getElementById('amount').value;

const category=
document.getElementById('category').value;

if(!title || !amount){

alert(
'Please fill all fields'
);

return;

}

const expenseData={

title,
amount,
category

};

try{

const response=
await fetch(
'http://localhost:5000/api/expenses/add',
{

method:'POST',

headers:{
'Content-Type':
'application/json'
},

body:JSON.stringify(
expenseData
)

}

);

const data=
await response.json();

alert(data.message);

loadExpenses();

}
catch(error){

console.log(error);

}

}

async function loadExpenses(){

try{

const response=
await fetch(
'http://localhost:5000/api/expenses/all'
);

const expenses=
await response.json();

let total=0;

const selectedCategory=

document
.getElementById(
'filterCategory'
)
.value;


expenses
.filter(
expense=>

selectedCategory==="All"

||

expense.category===selectedCategory

)

.forEach(
(expense)=>{

total+=Number(
expense.amount
);

}
);

document
.getElementById(
'totalExpense'
)
.innerText=
`Total: ₹${total}`;

const expenseList=
document.getElementById(
'expenseList'
);

expenseList.innerHTML=
"<h2>Expenses</h2>";

expenses.forEach(
(expense)=>{

expenseList.innerHTML += `

<div class="expense-card">

<span>
${expense.title}
</span>

<span>
₹${expense.amount}
</span>

<span>
${expense.category}
</span>

<div class="action-buttons">

<button
onclick="
editExpense(
${expense.id},
'${expense.title}',
${expense.amount},
'${expense.category}'
)
">

Edit

</button>

<button
onclick="
deleteExpense(${expense.id})
">

Delete

</button>

</div>

</div>

`;

}

);

}
catch(error){

console.log(error);

}

}

async function deleteExpense(id){

console.log(
"Delete clicked:",
id
);

try{

const response=
await fetch(

`http://localhost:5000/api/expenses/delete/${id}`,

{

method:'DELETE'

}

);

const data=
await response.json();

console.log(data);

loadExpenses();

}
catch(error){

console.log(error);

}

}

async function editExpense(
id,
oldTitle,
oldAmount,
oldCategory
){

const title=
prompt(
"Enter title",
oldTitle
);

const amount=
prompt(
"Enter amount",
oldAmount
);

const category=
prompt(
"Enter category",
oldCategory
);

const updatedData={

title,
amount,
category

};

try{

await fetch(

`http://localhost:5000/api/expenses/update/${id}`,

{

method:'PUT',

headers:{

'Content-Type':
'application/json'

},

body:
JSON.stringify(
updatedData
)

}

);

loadExpenses();

}
catch(error){

console.log(error);

}

}
