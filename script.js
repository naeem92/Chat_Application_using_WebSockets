const socket = io();

// Select the elements
const chatHistory = document.querySelector('.chat-history');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Handle connection
socket.on('connect', () => {
  console.log('Socket.IO connection opened');
});

// Handle incoming messages
socket.on('message', (message) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'other');
  messageElement.textContent = message;
  chatHistory.appendChild(messageElement);
  chatHistory.scrollTop = chatHistory.scrollHeight;
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Socket.IO connection closed');
});

// Send Message Function
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    socket.emit('message', message);
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user');
    messageElement.textContent = message;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    messageInput.value = '';
  }
});
