const socket = io();

let name;
const textarea = document.getElementById('textarea')
const messageArea = document.querySelector('.message-view-area')

do{
  name  = prompt('Please enter your name');
}while(!name)


textarea.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){
    sendMessage(e.target.value)
  }
})

// Send message
function sendMessage(msg){
  let message = {
    user: name,
    msgBody: msg.trim()
  }

  // Append in dom
  appendMessage(message, 'outgoing')

  textarea.value = ''

  scrollToBottom();

  // Send to server
  socket.emit('appMessage', message)
}


// Receive Message
socket.on('broadcastMessage', (msg) => {
  appendMessage(msg, 'incoming')
  scrollToBottom();
})

function appendMessage(message, msgType){
  const div = document.createElement('div')
  div.classList.add('message', msgType)

  const h4 = document.createElement('h4')
  const p = document.createElement('p')

  h4.innerText = message.user;
  p.innerText = message.msgBody

  div.appendChild(h4)
  div.appendChild(p)

  messageArea.appendChild(div);
}


function scrollToBottom(){
  messageArea.scrollTop = messageArea.scrollHeight;
}