/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React from "react";
import { Rectangle, RectangleProps } from "react-leaflet";

interface CellProps extends Omit<RectangleProps, "bounds"> {
  center: L.LatLng;
}

const Cell = React.forwardRef<L.Rectangle, CellProps>(function Cell(
  props,
  ref
) {
  return <Rectangle ref={ref} />;
});
