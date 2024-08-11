const socket = io();

// Retrieve the username from localStorage
const username = localStorage.getItem('username');

// Redirect to login if no username is set
if (!username) {
  window.location.href = '/';
}

// Select elements with updated IDs
const chatHistory = document.querySelector('.chat-history');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const logoutButton = document.getElementById('logout-button');
const welcomeMessage = document.getElementById('welcome-message');

// Set the welcome message with the username
welcomeMessage.textContent = `Welcome: ${username}`;

// Handle logout
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('username');
  window.location.href = '/';
});

// Handle incoming messages
socket.on('message', (data) => {
  const { username: senderUsername, message } = data;

  // Display the message if it's from another user
  if (senderUsername !== username) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'other');
    messageElement.innerHTML = `<span class="username-opacity">${senderUsername}:</span> ${message}`;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }
});

// Send Message Function
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user');
    messageElement.innerHTML = `<span class="username-opacity">Me:</span> ${message}`;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    socket.emit('message', { username, message });
    messageInput.value = '';
  }
});


