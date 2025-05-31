<script setup lang="ts">
import { useOpenCard } from '~/composables/openCard'
import {symbols} from '~/assets/images/symbols'
useHead({
  title: 'Memory',
})
onMounted(() => {
  resetGame()
})
import { onMounted } from 'vue'
import { useGetStatus } from '~/composables/getStatus'


const isGameRunning = ref(false)
const openedCards = ref(new Set<number>())
const matchedCards = ref(new Set<number>())
const moves = ref(0)
const cards = ref([])
const score = ref(0)


const timer = ref(90); 

const getStatus = useGetStatus(openedCards, matchedCards)
const openCard = useOpenCard(
  isGameRunning, openedCards, matchedCards, moves, cards, score
)

const difficulties = {
  easy: { pairs: 4, time: 60 },
  medium: { pairs: 6, time: 90 },
  hard: { pairs: 9, time: 120 },
};
const selectedDifficulty = ref('medium');

import { watch } from 'vue';


watch(selectedDifficulty, () => {
  const { time } = difficulties[selectedDifficulty.value];
  timer.value = time;         
  resetGame(true); 
});

// const bestScore = ref(Number(localStorage.getItem('bestScore')) || 0);
const bestScore = ref(0);

let timerInterval: NodeJS.Timeout | null = null;


function resetGame(keepTimer = false) {
  moves.value = 0;
  openedCards.value.clear();
  matchedCards.value.clear();

  const { pairs } = difficulties[selectedDifficulty.value];
  const selectedSymbols = symbols.slice(0, pairs);


  const duplicatedSymbols = selectedSymbols.flatMap(s => [{ ...s }, { ...s }]);


  cards.value = shuffleCards(duplicatedSymbols);

  isGameRunning.value = false;

  if (!keepTimer && timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}



function startGame() {
  score.value = 0;
  const { time } = difficulties[selectedDifficulty.value];
  timer.value = time;
  resetGame(true);
  isGameRunning.value = true;

  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value -= 1;

      const { pairs } = difficulties[selectedDifficulty.value];
      if (matchedCards.value.size === pairs * 2) {
        timer.value += 5;
        score.value += 20;
        resetGame(true);
        isGameRunning.value = true;
      }
    } else {
      endGame();
    }
  }, 1000);
}

// const game = useGameStore();
// game.gameID = 2
function endGame() {
  isGameRunning.value = false;
  timer.value = 0;
  // game.duration = timer.value;
  // game.level = 0;


  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (score.value > bestScore.value) {
    bestScore.value = score.value;
    // localStorage.setItem('bestScore', String(bestScore.value));
  }
}

const CLOSE_TIMEOUT = 1000;
const hasTwoCardsOpened = computed(() => openedCards.value.size === 2);

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
    <GamesMemoryCard
      v-for="(card, index) in cards"
      :key="index"
      :status="getStatus(index)"
      :disabled="hasTwoCardsOpened || !isGameRunning"
      :image="card.image"
      @click="openCard(index)"
    />
  </div>

<div v-if="!isGameRunning && timer === 0" class="overlay">
  <div class="overlay-content">
    <h2>Game over!</h2>
    <div>Your score: {{ score }}</div>
    <button @click="startGame">Reset</button>
  </div>
</div>

  <div class="difficulty-select">
    <label for="difficulty">Difficulty:</label>
    <select v-model="selectedDifficulty" id="difficulty" :disabled="isGameRunning">
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  </div>

  <button v-if="!isGameRunning" @click="startGame">Start Game</button>
  <button v-else @click="endGame">End Game</button>
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
 position: relative; 
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

.difficulty-select {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.difficulty-select select {
  padding: 5px;
  border-radius: 5px;
  font-size: 1rem;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;     
  height: 100%;  
  background: rgba(10, 10, 10, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-radius: 10px;
}

.overlay-content {
  background: #181c24;
  color: #fff;
  padding: 2em 3em;
  border-radius: 10px;
  box-shadow: 0 0 10px #000;
  text-align: center;
  border: 3px solid #fff;
}

.overlay-content h2 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.overlay-content button {
  margin-top: 1em;
  padding: 0.5em 2em;
  font-size: 1.1em;
  border-radius: 8px;
  border: none;
  background: #fff;
  color: #181c24;
  cursor: pointer;
  font-weight: bold;
}

.overlay-content button:hover {
  background: #eee;
}

</style>