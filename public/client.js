const socket = io();

let Name;
let textarea = document.querySelector('#textarea');
let messagearea = document.querySelector('.message__area');

do {
  Name = prompt('Please enter your name');
} while (!Name);

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: Name,
    message: message.trim()
  };
  

  // Append the message to the message area (outgoing message)
  appendMessage(msg, 'outgoing');
  textarea.value = '';
  scrollToBottom();
  socket.emit('message',msg)
}

function appendMessage(msg, type) {
  let className = type;
  let mainDiv = document.createElement('div'); // Create a new div for each message
  mainDiv.classList.add(className, 'message');

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
  `;
  mainDiv.innerHTML = markup;
  messagearea.appendChild(mainDiv);
  
}

// Listen for incoming messages from the server
socket.on('message', (msg) => {
  // Append the message to the message area (incoming message)
  appendMessage(msg, 'incoming');
  scrollToBottom()
});

function scrollToBottom() {
  messagearea.scrollTop = messagearea.scrollHeight
}
