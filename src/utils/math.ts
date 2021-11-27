/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import { create, all, MathJsStatic, Matrix } from "mathjs";

/**
 * Extended interface bcause @types/mathjs is not complete
 */
interface Math extends Partial<MathJsStatic> {
  SparseMatrix: {
    fromJSON: (json: string | object) => Matrix;
  };
}

const config = {};
const math = create(all, config) as Math;

/**
 * Function to compare whether two numbers are the same, returns true if the difference is less than or equal to the defined tolerance
 * @param value1 | First value
 * @param value2 | Second value
 * @param tolerance | Tolerance under which two numbers should be considered the same
 */
export function compareWithTolerance(
  value1: number,
  value2: number,
  tolerance: number
): boolean {
  return Math.abs(value1 - value2) <= Math.abs(tolerance);
}

/**
 * Compares two objects of the pattern [key]: number to see if their values match within a given tolerance
 * @param obj1 | First object to compare
 * @param obj2 | Second object to compare
 * @param tolerance | Tolerance for comparing values
 */
export function compareObjectWithTolerance(
  obj1: object,
  obj2: object,
  tolerance: number
): boolean {
  const sames = [];
  Object.keys(obj1).forEach((e) => {
    if (compareWithTolerance(obj1[e], obj2[e], tolerance)) {
      sames.push(true);
    } else {
      sames.push(false);
    }
  });
  return !sames.some((c) => !c);
}

/**
 * Function to take in a number, and pad it with leading zeroes, such that the results
 * in a given number of characters long
 * @param number The number to pad
 * @param zeros The number of characters to pad to
 * @example
 * padWithZeroes(22, 4); // '0022'
 * padWithZeroes(500, 6); // '000500'
 * padWithZeroes(34.5, 4); // '034.5'
 * padWithZeroes(123, 2); // '123'
 */
export const padWithZeroes = (number: number, characters: number): string => {
  if (number.toString().length >= characters) {
    return number.toString();
  }
  return ("0".repeat(characters) + number).slice(-characters);
};

export default math;
