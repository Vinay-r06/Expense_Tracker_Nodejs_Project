
async function login(e){
 try{
    e.preventDefault();

    const loginDetails={
        email: e.target.email.value,
        password: e.target.password.value
    }
    console.log(loginDetails);

 const response= await axios.post("http://44.201.102.117:3000/user/login", loginDetails)

 console.log(response.data)

 if (response.status===200){
    alert(response.data.message)
    localStorage.setItem('token', response.data.token)
    window.location.href="./expense.html"
 } else{
    throw new Error(response.data.message)
 }
 }
 catch(err){
 console.log(JSON.stringify(err))
 document.body.innerHTML+= `<div style="color:red;">${err.message} <div>`;
 }
}

function forgotpassword(){
   window.location.href="./forgotpass.html"
}











// request method: OPTIONS...

// IT will first checks wheather the backend allows for calls or not..
// the first request is for checking...
// its optional API callwhich checks which checks if the backend allows this particular browser to make request or not...
// then second thing is the post request... ignore options call 