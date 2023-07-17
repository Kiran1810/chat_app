document.addEventListener("DOMContentLoaded",()=>{
    console.log('welcome to sockets')
var socket=io();

let input=document.getElementById("chatBox");
let msgList=document.getElementById("msg_list");
let send=document.getElementById("send");
send.addEventListener('click',()=>{
    let msg=input.value;
    socket.emit('new_msg',
    {
      message:msg
    })
    input.value=""
    
})

socket.on("msg_rcvd", (data)=>{
    let create=document.createElement('li');
    create.textContent=data.message;
    msgList.appendChild(create);
    console.log(create)

});

})