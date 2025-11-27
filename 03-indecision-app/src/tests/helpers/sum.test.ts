import { describe, expect, test } from 'vitest';
import { sum, addArray } from '../../helpers/sum';

describe('agregar función', () => {
  test('adds 1 + 2 to equal 3', () => {
    
    const a = 1;
    const b = 4;

    const result = sum(a, b);

 
    expect(result).toBe(a + b);

  });
});

describe('addArray function', () => {
  test('Debe devolver 0 si la matriz está vacia', () => {
    const numberArray: number[] = [];

    const result = addArray(numberArray);

    expect(result).toBe(0);
  });
});

  test('debería devolver el valor adecuado de la función addArray', () => {
    const numberArray = [1, 2, 3, 4, 5];

    const result = addArray(numberArray);

    expect(result).toBe(15);
  });
