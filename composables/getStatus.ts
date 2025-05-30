import type { Ref } from 'vue'

export function useGetStatus(
  openedCards: Ref<Set<number>>,
  matchedCards: Ref<Set<number>>
) {
  return function getStatus(index: number): 'opened' | 'matched' | 'closed' {
    if (openedCards.value.has(index)) {
      return 'opened'
    }
    if (matchedCards.value.has(index)) {
      return 'matched'
    }
    return 'closed'
  }
}