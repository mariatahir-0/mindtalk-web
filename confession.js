const confessionInput = document.getElementById("confessionInput");
const postConfessionBtn = document.getElementById("postConfession");
const confessionList = document.getElementById("confessionList");
const moodSelect = document.getElementById("moodSelect");
const randomConfessionBtn = document.getElementById("randomConfessionBtn");
const dailyQuote = document.getElementById("dailyQuote");

// Load from localStorage (ignore broken items)
let confessions = [];
try {
  const saved = JSON.parse(localStorage.getItem("confessions")) || [];
  confessions = saved.filter(c => c && c.text && c.mood); // remove undefined/bad entries
} catch (e) {
  confessions = [];
  localStorage.removeItem("confessions");
}

// Load Quote of the Day
let quoteOfDay = localStorage.getItem("quoteOfDay");
if (quoteOfDay) {
  dailyQuote.innerText = quoteOfDay;
} else {
  const quotes = [
    "Healing takes time, and that’s okay.",
    "It’s okay to not be okay.",
    "Let go of what you can’t control.",
    "Every feeling is temporary.",
    "You are stronger than you think."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  dailyQuote.innerText = randomQuote;
  localStorage.setItem("quoteOfDay", randomQuote);
}

// Show confessions
displayConfessions(confessions);

// Post new confession
postConfessionBtn.addEventListener("click", () => {
  const text = confessionInput.value.trim();
  const mood = moodSelect.value;

  if (text === "" || mood === "general") {
    alert("Please write something and select a mood!");
    return;
  }

  const newConfession = {
    text,
    mood,
    time: new Date().toLocaleString(),
  };

  confessions.unshift(newConfession);
  localStorage.setItem("confessions", JSON.stringify(confessions));

  displayConfessions(confessions);

  // Update quote of the day with user’s new thought
  dailyQuote.innerText = `"${text}"`;
  localStorage.setItem("quoteOfDay", `"${text}"`);

  confessionInput.value = "";
  moodSelect.value = "general";
});

// Display confessions safely
function displayConfessions(list) {
  confessionList.innerHTML = "";

  if (list.length === 0) {
    confessionList.innerHTML = "<p>No confessions yet.</p>";
    return;
  }

  list.forEach((c) => {
    if (!c.text) return; // skip empty entries
    const div = document.createElement("div");
    div.className = "confession-card";

    const mood = c.mood ? c.mood.toUpperCase() : "GENERAL";
    const time = c.time || "Just now";

    div.innerHTML = `
      <p>${c.text}</p>
      <small>${getMoodEmoji(c.mood)} ${mood} • ${time}</small>
    `;
    confessionList.appendChild(div);
  });
}

// Mood emoji
function getMoodEmoji(mood) {
  switch (mood) {
    case "happy": return "😊";
    case "sad": return "😢";
    case "angry": return "😤";
    case "love": return "💔";
    case "overthinking": return "💭";
    default: return "💬";
  }
}

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    if (filter === "all") {
      displayConfessions(confessions);
    } else {
      const filtered = confessions.filter(c => c.mood === filter);
      displayConfessions(filtered);
    }
  });
});

randomConfessionBtn.addEventListener("click", () => {
  if (confessions.length === 0) {
    alert("No confessions yet!");
    return;
  }
  const random = confessions[Math.floor(Math.random() * confessions.length)];
  alert(`💭 Random Confession:\n\n${random.text}`);
});

const comfortBox = document.getElementById("comfortBox");
const comfortMessages = [
  "You are not alone 💖",
  "It’s okay to take a break 🌿",
  "You are doing better than you think 🌸",
  "Your feelings are valid 💫",
  "Peace is slowly finding its way to you ☁️",
  "One step at a time — you’ve got this 🌻",
  "Healing doesn’t mean forgetting, it means growing 🌷"
];

comfortBox.addEventListener("click", () => {
  const randomMsg =
    comfortMessages[Math.floor(Math.random() * comfortMessages.length)];
  comfortBox.innerHTML = `<p>${randomMsg}</p>`;
});
