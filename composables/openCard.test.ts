import { ref } from 'vue'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useOpenCard } from './openCard'

describe('useOpenCard', () => {
  let isGameRunning: ReturnType<typeof ref>
  let openedCards: ReturnType<typeof ref>
  let matchedCards: ReturnType<typeof ref>
  let moves: ReturnType<typeof ref>
  let cards: ReturnType<typeof ref>
  let score: ReturnType<typeof ref>
  let openCard: (index: number) => void

  beforeEach(() => {
    isGameRunning = ref(true)
    openedCards = ref(new Set<number>())
    matchedCards = ref(new Set<number>())
    moves = ref(0)
    cards = ref([
      { name: 'apple' },
      { name: 'apple' },
      { name: 'banana' },
      { name: 'banana' }
    ])
    score = ref(0)
    openCard = useOpenCard(isGameRunning, openedCards, matchedCards, moves, cards, score)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('does nothing if game is not running', () => {
    isGameRunning.value = false
    openCard(0)
    expect(openedCards.value.size).toBe(0)
  })

  it('opens a card and increases moves', () => {
    openCard(0)
    expect(openedCards.value.has(0)).toBe(true)
    expect(moves.value).toBe(1)
  })

  it('does not open already opened or matched card', () => {
    openedCards.value.add(0)
    matchedCards.value.add(1)
    openCard(0)
    openCard(1)
    expect(openedCards.value.size).toBe(1)
  })

  it('matches two same cards and increases score', async () => {
    openCard(0)
    openCard(1)
    vi.advanceTimersByTime(700)
    await vi.runAllTimersAsync()
    expect(matchedCards.value.has(0)).toBe(true)
    expect(matchedCards.value.has(1)).toBe(true)
    expect(score.value).toBe(10)
    expect(openedCards.value.size).toBe(0)
  })

  it('closes cards if they do not match', async () => {
    openCard(0)
    openCard(2)
    vi.advanceTimersByTime(1000)
    await vi.runAllTimersAsync()
    expect(matchedCards.value.size).toBe(0)
    expect(openedCards.value.size).toBe(0)
  })
})