const socket=io.connect('live-chat-app-furkan.herokuapp.com')

const sender=document.getElementById('sender')
const submitBtn=document.getElementById('submitBtn')
const message=document.getElementById('message')
const output=document.getElementById('output')
const feedback=document.getElementById('feedback')

submitBtn.addEventListener('click',()=>{
    if (message.value=='') {
        alert('Mesaj alanı boş olamaz')
    }
    else if (sender.value==''){
        alert('Gönderici adı boş olamaz')
    }
    else{
        socket.emit('chat',{
            message: message.value,
            sender: sender.value
        })
    }
    
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