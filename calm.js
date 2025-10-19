 const filterButtons = document.querySelectorAll('.filter-btn');
const tipCards = document.querySelectorAll('.tip-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-category');

    tipCards.forEach(card => {
      if(category === 'all' || card.getAttribute('data-category') === category){
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});
const moodButtons = document.querySelectorAll('.mood-btn');
const moodLogContainer = document.getElementById('mood-log');

let moods = JSON.parse(localStorage.getItem('moods')) || [];


function displayMoods() {
  moodLogContainer.innerHTML = '';
  moods.slice(-7).forEach(mood => {
    const div = document.createElement('div');
    div.classList.add('mood-card', mood.mood);
    div.textContent = mood.emoji;
    moodLogContainer.appendChild(div);
  });
}


moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const today = new Date().toLocaleDateString();
    moods.push({ date: today, emoji: btn.textContent.split(' ')[0], mood: btn.dataset.mood });
    if (moods.length > 7) moods.shift(); // keep last 7
    localStorage.setItem('moods', JSON.stringify(moods));
    displayMoods();
  });
});


displayMoods();

const breathCircle = document.getElementById('breathCircle');
const phaseText = document.getElementById('phase');
const countText = document.getElementById('count');
const startBtn = document.getElementById('startBreathing');
const stopBtn = document.getElementById('stopBreathing');

let breathingInterval;
let seconds = 4;
let inhale = true;

function startBreathing() {
  inhale = true;
  seconds = 4;
  phaseText.textContent = 'Inhale';
  countText.textContent = seconds;
  breathCircle.style.transform = 'scale(1.5)';
  breathCircle.style.opacity = '1';

  breathingInterval = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      inhale = !inhale;
      seconds = 4;
      phaseText.textContent = inhale ? 'Inhale' : 'Exhale';
      breathCircle.style.transform = inhale ? 'scale(1.5)' : 'scale(1)';
      breathCircle.style.opacity = inhale ? '1' : '0.7';
    }
    countText.textContent = seconds;
  }, 1000);
}

function stopBreathing() {
  clearInterval(breathingInterval);
  seconds = 4;
  inhale = true;
  phaseText.textContent = 'Inhale';
  countText.textContent = seconds;
  breathCircle.style.transform = 'scale(1)';
  breathCircle.style.opacity = '0.7';
}

startBtn.addEventListener('click', startBreathing);
stopBtn.addEventListener('click', stopBreathing);

const memoryGrid = document.getElementById('memoryGrid');
const movesCounter = document.getElementById('movesCounter');

// Calm emojis (8 pairs = 16 cards)
const emojis = ["🌿","🌸","🌞","🍃","🌙","💧","🕊️","🌊"];
let cards = [...emojis, ...emojis];

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

// Create cards
cards.forEach((emoji, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.dataset.index = index;
  card.textContent = '';
  memoryGrid.appendChild(card);

  card.addEventListener('click', () => {
    if(lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.textContent = emoji;

    if(!firstCard){
      firstCard = card;
    } else {
      secondCard = card;
      lockBoard = true;
      moves++;
      movesCounter.textContent = `Moves: ${moves}`;

      if(firstCard.dataset.emoji === secondCard.dataset.emoji){
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetTurn();
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          firstCard.textContent = '';
          secondCard.textContent = '';
          resetTurn();
        }, 1000);
      }
    }
  });
});

function resetTurn(){
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
function animateCounter(id, target, duration = 2000){
  let counter = document.getElementById(id);
  let start = 0;
  let increment = target / (duration / 50);
  let interval = setInterval(() => {
    start += increment;
    if(start >= target){
      counter.textContent = target;
      clearInterval(interval);
    } else {
      counter.textContent = Math.floor(start);
    }
  }, 50);
}

// Intersection Observer
const statsSection = document.querySelector('.calm-stats');
let counted = false;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting && !counted){
      animateCounter('moodCount', 50);
      animateCounter('breathCount', 120);
      animateCounter('gameCount', 75);
      animateCounter('tipsCount', 200);
      counted = true; // ensures counters run only once
    }
  });
}, { threshold: 0.5 }); // triggers when 50% of section is visible

observer.observe(statsSection);
