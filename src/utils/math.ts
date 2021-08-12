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

export default math;
