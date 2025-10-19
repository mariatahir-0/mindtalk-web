const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');

    function sendMessage() {
      const msg = chatInput.value.trim();
      if(msg === '') return;
      addMessage(msg, 'user-message');
      chatInput.value = '';

      setTimeout(() => {
        let botReply = generateBotReply(msg);
        addMessage(botReply, 'bot-message');
      }, 800);
    }

    function addMessage(text, className) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `message ${className}`;
      msgDiv.textContent = text;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function quickMessage(text){
      addMessage(text, 'user-message');
      setTimeout(() => {
        let botReply = generateBotReply(text);
        addMessage(botReply, 'bot-message');
      }, 800);
    }

    function generateBotReply(msg){
   
      if(msg.toLowerCase().includes('hello')) return "Hello! How can I help you today?";
      if(msg.toLowerCase().includes('help')) return "Sure, I'm here to assist you!";
      if(msg.toLowerCase().includes('problem')) return "Please describe your problem in detail.";
      return "We have received your message, and we are now providing you with a solution…";
    }

    chatInput.addEventListener('keypress', function(e){
      if(e.key === 'Enter') sendMessage();
    });

const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
  const question = card.querySelector('.faq-question');
  question.addEventListener('click', () => {
    // Close other open cards if needed
    faqCards.forEach(c => {
      if(c !== card) c.classList.remove('active');
    });

    // Toggle current card
    card.classList.toggle('active');
  });
});
