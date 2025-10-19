const buttons = document.querySelectorAll('.predefined-btn');
const chatMessages = document.getElementById('chat-messages');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const userMsg = document.createElement('div');
    userMsg.textContent = btn.textContent; // button text user message me
    userMsg.style.textAlign = 'right';
    userMsg.style.margin = '5px';
    chatMessages.appendChild(userMsg);

    const botMsg = document.createElement('div');
    botMsg.style.textAlign = 'left';
    botMsg.style.margin = '5px';

    const replyType = btn.getAttribute('data-reply');
    if(replyType === "hello") botMsg.textContent = "Bot: Hello! How can I help you today?";
    else if(replyType === "problem") botMsg.textContent = "Bot: Don’t worry! Please explain your problem in detail.";
    else if(replyType === "help") botMsg.textContent = "Bot: Sure! I am here to help. What do you need assistance with?";
    else botMsg.textContent = "Bot: Thanks for sharing. Our team will guide you soon!";

    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
});
function showComfortMessage(event) {
  event.preventDefault(); // stop normal submit
  const msg = document.getElementById("comfort-message");
  msg.style.display = "block";

  // clear textarea
  document.getElementById("thoughtText").value = "";

  // after 3 seconds redirect to confession page
  setTimeout(() => {
    window.location.href = "confession.html";
  }, 5000);
}

  const affirmations = [
    "You are a work in progress, and that’s beautiful. 💜",
    "Your feelings are valid — every single one. 🌙",
    "You have come so far, don’t forget that. 🌿",
    "Even on quiet days, you’re still growing. 🌸",
    "You are loved more than you realize. ☁️",
    "Take a deep breath — peace is within reach. ✨",
    "Your heart deserves rest too. 💫"
  ];

  let current = 0;

  function nextAffirmation() {
    const text = document.getElementById("affirmationText");
    text.classList.add("fade");
    setTimeout(() => {
      current = (current + 1) % affirmations.length;
      text.textContent = affirmations[current];
      text.classList.remove("fade");
    }, 500);
  }
 
let kindWords = JSON.parse(localStorage.getItem('kindWords')) || [];

function renderKindWords() {
  const container = document.getElementById('kindContainer');
  container.innerHTML = '';
  kindWords.forEach(word => {
    const bubble = document.createElement('div');
    bubble.className = 'kind-bubble';
    bubble.textContent = word;
    container.appendChild(bubble);
  });
}

// Initial render
renderKindWords();

// Updated addKindWord function
function addKindWord(e) {
  e.preventDefault();
  const input = document.getElementById('kindInput');
  const value = input.value.trim();
  if (!value) return;

  // Add to array and save to localStorage
  kindWords.unshift(value); // newest first
  localStorage.setItem('kindWords', JSON.stringify(kindWords));

  renderKindWords(); // re-render
  input.value = '';
}
