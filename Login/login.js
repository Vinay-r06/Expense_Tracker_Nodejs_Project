
async function login(e){
 try{
    e.preventDefault();

    const loginDetails={
        email: e.target.email.value,
        password: e.target.password.value
    }
    console.log(loginDetails);

 const response= await axios.post("http://localhost:3000/user/login", loginDetails)

 console.log(response.data)

 if (response.status===200){
    alert(response.data.message)
 } else{
    throw new Error(response.data.message)
 }
 }
 catch(err){
 console.log(JSON.stringify(err))
 document.body.innerHTML+= `<div style="color:red;">${err.message} <div>`;
 }
}

 











// request method: OPTIONS...

// IT will first checks wheather the backend allows for calls or not..
// the first request is for checking...
// its optional API callwhich checks which checks if the backend allows this particular browser to make request or not...
// then second thing is the post request... ignore options call 