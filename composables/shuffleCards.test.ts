import { describe, it, expect } from 'vitest'
import { shuffleCards } from './shuffleCards'

describe('shuffleCards', () => {
  it('shuffles array and keeps all elements', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffleCards(arr)
    expect(shuffled).toHaveLength(arr.length)
    expect(shuffled.sort()).toEqual(arr.sort())
  })
})