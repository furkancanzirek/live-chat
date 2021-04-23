const socket=io.connect('http://localhost:8080')

const sender=document.getElementById('sender')
const submitBtn=document.getElementById('submitBtn')
const message=document.getElementById('message')
const output=document.getElementById('output')
const feedback=document.getElementById('feedback')

submitBtn.addEventListener('click',()=>{
    socket.emit('chat',{
        message: message.value,
        sender: sender.value
    })
})

socket.on('chat',data=>{
    feedback.innerHTML=''
    output.innerHTML+='<p><strong>' + data.sender+': </strong>'+data.message+'</p>'
message.value=''
})

message.addEventListener('keypress',()=>{
    socket.emit('typing',sender.value)
})

socket.on('typing',data=>{
   if(!feedback.innerHTML.includes('Yazıyor')){
    feedback.innerHTML+='<p>'+data+ ' Yazıyor... </p>'
   }
    
})