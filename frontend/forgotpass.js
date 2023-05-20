async function forgotpassword(e){
    try{
e.preventDefault();
const form= new FormData(e.target);

const userDetails={
    email:e.target.email.value,
}
console.log('checking post email>>>',userDetails)
const response= await axios.post("http://localhost:3000/password/forgotpassword",userDetails)

console.log(response)

if(response.status===200){
    document.body.innerHTML+='<div style="color:red;">Mail Successfully Sent <div>'
    alert(response.data.message)
    window.location.href="./login.html";
    
} else {
    throw new Error('Something went wrong !!!')
}

}catch(err){
    document.body.innerHTML+=`<div style="color:red;">${err}<div>`;
}
}