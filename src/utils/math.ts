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

export default math;
