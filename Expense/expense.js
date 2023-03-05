async function addNewExpense(e){
    try{
    e.preventDefault();                                                                                                                      
const expenseDetail={                                                                                                                   // store the users in the right format..
                       expenseamount:document.getElementById("expenseamount").value,    
                       description:document.getElementById("description").value,
                       category:document.getElementById("category").value,
                    }
                                                                                                                                        // axios libraraies 'post' for post data and save to database
            const token = localStorage.getItem('token');
        const response = await axios.post("http://localhost:3000/expense/addExpense", expenseDetail, {headers: {"Authorization":token}})                                                    //i will do network call and save it over there.
            addNewExpensetoUI(response.data.newexpense)
            alert(response.data.message)
              }
           catch(err){
            showError(err)
           // document.body.innerHTML= document.body.innerHTML + `<div style="color:red;"> ${err}</div>` 
           }
                                                                                                                                        // showNewUserScreen(details                                                                                            // The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
        }



        window.addEventListener("DOMContentLoaded", async ()=>{                                                                                // the domcontentloaded event fires when the initial html document has been completely loaded and parsed, without waiting for stylesheets, images,and subframes to finish loading..

          const token = localStorage.getItem('token');
          const response = await axios.get("http://localhost:3000/expense/getExpense", {headers:{"Authorization": token}})  
          try{
          console.log(response)
            for(var i=0;i<response.data.allExpense.length;i++){
                addNewExpensetoUI(response.data.allExpense[i]);                                                             //response.data nothing but object
             }
            } 
           catch(err){
            showError(err)
           // document.body.innerHTML= document.body.innerHTML +  `<div style="color:red;"> ${err}</div>`
           }
        })                                                                                                                 //  console.log(data);              // i will get some data which is promise which is returning from promise

  async function addNewExpensetoUI(expense){ 
                   try{                       
        document.getElementById('expenseamount').value='';
        document.getElementById('description').value='';
        document.getElementById('category').value='';

                //  if(allExpense.getItem(expense.id)!==null){
                //    removeUserFromScreen(expense.id);
                //            }

        const parentElement = document.getElementById('listOfExpenses');
        const expenseElemId = `expense-${expense.id}`;
        parentElement.innerHTML += `<li id=${expenseElemId}> 
                                           ${expense.expenseamount} - ${expense.description} - ${expense.category}
                                <button onclick='deleteExpense(${expense.id})'> Delete Expense </button> 
                             </li>`
                             }

    catch(err){
        showError(err)
       // document.body.innerHTML= document.body.innerHTML + "<h4>Something went wrong in show in screen</h4>"
    }
}



 async function deleteExpense(expenseid){                                       // function for deleting the data in database..
  try{
    const token = localStorage.getItem('token');
    const response= await axios.delete(`http://localhost:3000/Expense/deleteExpense/${expenseid}`, {headers:{"Authorization": token}})
    removeExpensefromUI(expenseid);
    alert(response.data.message)
   }
    catch(err){
       // document.body.innerHTML= document.body.innerHTML + "<h4>Something went wrong in delete</h4>"
       showError(err)   
       console.log(err);  
    }
}


   

 async function removeExpensefromUI(expenseid){
    try{
        const expenseElemId= `expense-${expenseid}`;
      document.getElementById(expenseElemId).remove();   
    }
    catch(err){
       // document.body.innerHTML= document.body.innerHTML + "<h4>Something went wrong in removing</h4>"
       showError(err)  
       console.log(err);  
    }
}


function showError(err){
    document.body.innerHTML+= `<div style="color:red;"> ${err}</div>`
}