const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to append a message to the chat messages container
function appendMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(sender);
  messageElement.innerText = message;
  chatMessages.appendChild(messageElement);
}

// Function to send a message to the server
async function sendMessageToServer(message) {
  const response = await fetch('https://bizzman-website-chatbot--team-coala-bizzman.repl.co/api/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  console.log('data' + data.message)
  return data.message;
}

// Event listener for send button click
sendButton.addEventListener('click', async () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    appendMessage(message, 'user');

    // Send the message to the server and get the response
    const response = await sendMessageToServer(message);
    appendMessage(response, 'bot');

    // Clear the input field
    messageInput.value = '';
  }
});

// Event listener for Enter key press in the input field
messageInput.addEventListener('keypress', async (event) => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});