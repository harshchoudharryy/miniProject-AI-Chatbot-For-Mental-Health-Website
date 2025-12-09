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

    // Add typing indicator
    const typingMsg = appendMessage('AI', 'Typing...');

    try {
      const response = await fetch('https://mindcare-hrv2.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      typingMsg.remove(); // remove typing indicator

      if (data.reply) {
        appendMessage('AI', data.reply);
      } else {
        appendMessage('AI', '⚠️ No response from server.');
      }
    } catch (error) {
      typingMsg.remove();
      appendMessage('AI', '⚠️ Server error. Try again later.');
    }
  });

  function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return messageDiv;
  }
});
