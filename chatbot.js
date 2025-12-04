document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chatWindow = document.getElementById('chat-window');

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('You', message);
    userInput.value = '';

    appendMessage('AI', 'Typing...');

    try {
      const response = await fetch('https://mindcare-hrv2.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      // Remove temporary "Typing..."
      removeLastMessage();

      if (data.reply) {
        appendMessage('AI', data.reply);
      } else {
        appendMessage('AI', 'No response from server.');
      }
    } catch (error) {
      console.error('Error:', error);

      removeLastMessage();
      appendMessage('AI', '⚠️ Server error. Please try again later.');
    }
  });

  function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function removeLastMessage() {
    const messages = chatWindow.getElementsByClassName('message');
    if (messages.length > 0) {
      chatWindow.removeChild(messages[messages.length - 1]);
    }
  }
});
