// in signup.html--->i passed--> signup(event)....event object

async function signup(e){
    try{
  e.preventDefault();

 // console.log(e.target.email.value);

  const signupdetails={
    name:e.target.name.value,
    email:e.target.email.value,
    password:e.target.password.value
  }

  const response = await axios.post("http://44.201.102.117:3000/user/signup", signupdetails)

  if(response.status ===201){
  window.location.href="./login.html"        // change the page once successful login
  }else{
   throw new Error('Failed to login')
  }

}
    catch(err){
        document.body.innerHTML += `<div style="color:red;">${err} <div>` + "<h4>User already exists</h4>";
    }
}




















// 201 status adding or create to the database..if u get 201 then the user has been added to the database...






// task 1 create aws--> yash teach


// before the time ppl use to go live-- heroku deployment
// but now--->aws, azure, and google cloud platform..


// what is server?

//---like u r laptop--> without GUI....// there are servers which have got GUI..like windows server..
//---u will be "linux" os or "ubuntu"
//----it has termial where u can run code...
//---we open the ports of the server...(configured from aws website)
// we get inside the server via those ports--> that is something which u can configure from aws azure gcp..
// aws is website from that there u can configure 
// basicall u open up few ports
// and u had some password
// but u will open up some ports for the external users to use...
// --- localhost:3000  ...serversIp:3000

// example: u r backend running on the localhost 3000 of the server...
// if i know the server Ip..i should be able to hit the backend...
// if i run serversIp:3000----> then i should able to get "data"....means get "data" from the backend... 
// we will open the port--3000 from the server.. we can do it from the aws website...



// in that u had different os like microsoft os and windows os...
// it has proper "GUI" system...
// it has proper "graphical user interface"
// our laptop useful to normal users...not for techies
// because of GUI u can "open"  .. like finder..
// but in server it is made for 1 purpose only...

// serving code and like computation
// server had terminal...u can install other things..u can use it like laptop alsoo...
// the purpose of server is run the "backend"..whenever requests or anything come u can serve it..that is the main purpose of having a "backend"...

// ur laptop had firewall....if  i want access ur laptop that cant...

//but in the server--> there is mechanism--> which i can get inside the server..from this laptop
// we actually do --> we open the "ports"




// laptop also had network
// if i give "networkIp" and tell someone can get inside my laptop...it is possible but difficult...
// if i disable firewalls..ppl can get inside my laptop..by giving password and other things..


// in server it is more easier to get inside it...
// for security... there will password and private key to protect server...not everyone can enter..



// server mainly made for compiling code...."compailing and running code"...