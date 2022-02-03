import React from 'react';
import '@testing-library/jest-dom'
import { removeUltimateLines } from "./functions/removeUltimateLines";
let str="texto a cortar.<a> </a>"

test('Se renderiza el componente', () => {
  expect(removeUltimateLines(str)).toBe("texto a cortar.")
});


