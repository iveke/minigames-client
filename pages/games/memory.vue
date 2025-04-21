<script setup lang="ts">
import {symbols} from '~/assets/images/symbols.ts'
useHead({
  title: 'Memory',
})

const cards = ref([]);
const moves = ref(0);
const totalPairs = 6; 
const matchedCards = ref(new Set<number>());
const openedCards = ref(new Set<number>());
const matches = computed(() => matchedCards.value.size);
const isGameWon = computed(() => matches.value === totalPairs);

const timer = ref(60); 
const score = ref(0); 


// const bestScore = ref(Number(localStorage.getItem('bestScore')) || 0);
const bestScore = ref(0);

const isGameRunning = ref(false); 
let timerInterval: NodeJS.Timeout | null = null;

function resetGame(keepTimer = false) {
  moves.value = 0;
  openedCards.value.clear();
  matchedCards.value.clear();
  cards.value = shuffleCards([...symbols.slice(0, totalPairs), ...symbols.slice(0, totalPairs)]);
  isGameRunning.value = false;

  
  if (!keepTimer && timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function startGame() {
  score.value = 0;
  timer.value = 60;
  resetGame();
  isGameRunning.value = true;

  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value -= 1;

    
      if (matchedCards.value.size === totalPairs * 2) {
        timer.value += 5;
        resetGame(true); 
        isGameRunning.value = true; 
      }
    } else {
      endGame();
    }
  }, 1000);
}

function endGame() {
  isGameRunning.value = false;

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (score.value > bestScore.value) {
    bestScore.value = score.value;
    // localStorage.setItem('bestScore', String(bestScore.value));
  }
}

function openCard(index) {
  if (!isGameRunning.value || openedCards.value.has(index)) return;

  moves.value += 1;
  openedCards.value.add(index);

  if (openedCards.value.size === 2) {
    const [firstIndex, secondIndex] = [...openedCards.value.values()];
    if (cards.value[firstIndex].name === cards.value[secondIndex].name) {
      matchedCards.value.add(firstIndex);
      matchedCards.value.add(secondIndex);
      score.value += 10;
    }

    setTimeout(() => {
      openedCards.value.clear();
    }, 1000);
  }
}

function getStatus(index) {
  if (openedCards.value.has(index)) {
    return 'opened';
  }

  if (matchedCards.value.has(index)) {
    return 'matched';
  }

  return 'closed';
}

const CLOSE_TIMEOUT = 1000;
const hasTwoCardsOpened = computed(() => openedCards.value.size === 2);
watch(hasTwoCardsOpened, (areTwoCardsOpened) => {
  if (!areTwoCardsOpened) {
    return;
  }

  setTimeout(() => {
    openedCards.value.clear()
  }, CLOSE_TIMEOUT);

  const [firstIndex, secondIndex] = [...openedCards.value.values()];
  if (cards.value[firstIndex].name === cards.value[secondIndex].name) {
    matchedCards.value.add(firstIndex);
    matchedCards.value.add(secondIndex);
  }
});

resetGame();
</script>

<template>
  <div class="main">
    <div class="game">
      <h1>Memory Game</h1>

      <div class="game-info">
        <div>Score: {{ score }}</div>
        <div>Best Score: {{ bestScore }}</div>
      </div>
      <div class="game-timer">
        
        <div>Time Left: {{ timer }}s</div>
      </div>
      <div class="board">
        <memory-card
            v-for="(card, index) in cards"
            :key="index"
            :status="getStatus(index)"
            :disabled="hasTwoCardsOpened || !isGameRunning"
            :image="card.image"
            @click="openCard(index)"
        />
      </div>

      <button v-if="!isGameRunning" @click="startGame">Start Game</button>
      <button v-else @click="resetGame">Reset Game</button>

      <div v-if="!isGameRunning && timer.value === 0" class="end-message">
        Time's up! Your score: {{ score }}
      </div>

    </div>

  </div>
</template>


<style scoped>
.main {
  font-family: "Luckiest Guy", cursive;
  background-color: var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--primary-color);
  letter-spacing: 0.15em;
}
.game {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;

}


h1 {
  font-family: "Luckiest Guy", cursive;
  font-weight: 700;
  font-size: 2em;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.game-info {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  user-select: none; 
}

.game-info div {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
}

.game-timer {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  padding: 0 10px;
  user-select: none; 
}

.game-timer div{
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
}

.board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
  margin-top: 1em;
}

.board .card {
  width: 6em;
  height: 6em;
  perspective: 50em;
  cursor: pointer;
  border: none; 
  outline: none; 
}

.board .card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.board .card.visible .card-inner {
  transform: rotateY(180deg);
}

.board .card-front {
  background-color: #ffffff;
  transform: rotateY(180deg);
  color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-weight: bold;
  border-radius: 0.5em;
  box-shadow: 0.1em 0.1em 0.2em rgba(0, 0, 0, 0.2);
}

.board .card-back {
  background-color: var(--primary-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-weight: bold;
  border-radius: 0.5em;
  box-shadow: 0.1em 0.1em 0.2em rgba(0, 0, 0, 0.2);
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 1.5em;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  letter-spacing: inherit;
}

button:hover {
  opacity: 0.8;
}

.win-message {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #27ae60;
  font-weight: bold;
}

.end-message {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #e74c3c;
  font-weight: bold;
}

@media (max-width: 768px) {
  .board {
    grid-template-columns: repeat(2, 1fr);
  }
  .card {
    height: 100px;
  }
}
</style>