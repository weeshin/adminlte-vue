// sum.test.js
import { expect, test } from 'vitest'
import { sum, substract } from '@/components/sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
});

test('substract 2 - 2 to equal 0', () => {
    expect(substract(2, 2)).toBe(0)
});