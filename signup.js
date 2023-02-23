// in signup.html--->i passed--> signup(event)....event object

async function signup(e){
    try{
  e.preventDefault();
  const name=e.target.name;
  const email=e.target.email;
  const password=e.target.password;
 
  const signupdetails={
    name:name,
    email:email,
    password:password
  }

  const response = await axios.post("http://localhost:3000/user/signup", signupdetails)

  if(response.status ===201){
  window.location.href="../Login/login.html"        // change the page once successful login
  }else{
   throw new Error('Failed to login')
  }

}
    catch(err){
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    }
}



// 201 status adding or create to the database..if u get 201 then the user has been added to the database...