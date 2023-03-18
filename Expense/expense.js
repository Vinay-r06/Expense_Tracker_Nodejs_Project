

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

        function showPremiumuserMessage(){
        document.getElementById('rzp-button').style.visibility="hidden"
        document.getElementById('message').innerHTML= 'Your premium user now'
      }

      function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

        window.addEventListener("DOMContentLoaded", async ()=>{                                                                                // the domcontentloaded event fires when the initial html document has been completely loaded and parsed, without waiting for stylesheets, images,and subframes to finish loading..
          const token = localStorage.getItem('token');
          const decodeToken = parseJwt(token);
          console.log(decodeToken)
          const isPremiumUser = decodeToken.ispremiumuser
           if(isPremiumUser){
             showPremiumuserMessage()
             showLeaderBoard()
            }
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


document.getElementById('rzp-button').onclick= async function (e){
  try{
  const token = localStorage.getItem('token');
  console.log("token from localsto>>", token);
  const response= await axios.get('http://localhost:3000/purchase/premiummembership', {headers:{"Authorization": token} })
  console.log(response)
  var options = {
    "key": response.data.key_id,                                                       // enter the key id generated from the dashboard
    "order_id": response.data.order.id,                                                 // for one time payment
  
               // this handler function will handle the success payment
    "handler": async function(response){
      const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
      }, { headers: {"Authorization": token } })
      console.log(res)
      alert('You are a Premium User Now, Thanks for using our service')
      document.getElementById('rzp-button').style.visibility="hidden"
      document.getElementById('message').innerHTML= 'Your premium user now'
      localStorage.setItem('token', res.data.token);                                         // taken token from backend after buy premiuim
      showLeaderBoard()
    },          
  };

 const rzp1 = new Razorpay(options);
 rzp1.open();
 e.preventDefault();

 rzp1.on('payment.failed', function (response){
  axios.post('http://localhost:3000/purchase/transactionFailureUpdate', {
        order_id: options.order_id,
      }, { headers: {"Authorization": token } })
  console.log(response)
  alert('Something went wrong')
 })
}
catch(err){
  showError(err)  
  console.log(err);  
}
}

function showLeaderBoard(){
 const inputElement= document.createElement("input")
 inputElement.type='button'
 inputElement.value='Show LeaderBoard'
 inputElement.onclick= async()=>{
 const token=localStorage.getItem('token')

 const userLeaderBoardArray= await axios.get('http://localhost:3000/premium/showLeaderBoard', {headers: {'Authorization': token}})

 var leaderBoardElem= document.getElementById("leaderboard");
 leaderBoardElem.innerHTML+='<h1>Leader Board</h1>'
 userLeaderBoardArray.data.forEach((userDetails)=>{
  leaderBoardElem.innerHTML+=`<li>Name - ${userDetails.name} , Total Expense - ${userDetails.total_cost || 0 }</li>`
 })
}
document.getElementById('message').appendChild(inputElement);
}



// changes made in code-->

// first save it in local storage which in backend to frontend..the token is generated after buy premium in backend we taking that token..
// while login add ispremiumuser to encode while encoding
// stackofl-->copy code and paste in frontend
// and check by--> if 
// u can check in jwt.io...there paylaod(while post inside axios.post(with url and payload) ) --which u encoded--name ispremium and id..
// in the token only we passed "ispremium"..no way to tampered



// adding showLeaderFeature()