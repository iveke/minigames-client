import type { Ref } from 'vue'

export function useOpenCard(
  isGameRunning: Ref<boolean>,
  openedCards: Ref<Set<number>>,
  matchedCards: Ref<Set<number>>,
  moves: Ref<number>,
  cards: Ref<Array<{ name: string }>>,
  score: Ref<number>
) {
  return function openCard(index: number) {
    if (
      !isGameRunning.value ||
      openedCards.value.has(index) ||
      matchedCards.value.has(index)
    ) return;

    if (openedCards.value.size >= 2) return;

    moves.value += 1;
    openedCards.value.add(index);

    if (openedCards.value.size === 2) {
      const [firstIndex, secondIndex] = [...openedCards.value.values()];
      if (cards.value[firstIndex].name === cards.value[secondIndex].name) {
        matchedCards.value.add(firstIndex);
        matchedCards.value.add(secondIndex);
        score.value += 10;
        setTimeout(() => {
          openedCards.value.clear();
        }, 700);
      } else {
        setTimeout(() => {
          openedCards.value.clear();
        }, 1000);
      }
    }
  }
}