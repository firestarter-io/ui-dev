/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React from "react";
import * as L from "leaflet";
import { Rectangle, RectangleProps } from "react-leaflet";
import GeoUtil from "leaflet-geometryutil";

interface CellProps extends Omit<RectangleProps, "bounds"> {
  /**
   * The center of the Cell
   */
  center: L.LatLng;
  /**
   * The size of the Cell in meters
   */
  size: number;
}

/**
 * Cell component creates a leaflet Rectangle, which represents a single Cell as defined
 * by the [Firestarter NodeJS algorithm](https://firestarter-io.github.io/node-algorithm/algorithm/cell/cell/).
 */
export const Cell = React.forwardRef<L.Rectangle, CellProps>(function Cell(
  { center, size, ...props }: CellProps,
  ref
) {
  const topLeft = GeoUtil.destination(center, -45, Math.SQRT1_2 * size);
  const bottomRight = GeoUtil.destination(center, 135, Math.SQRT1_2 * size);

  return (
    <Rectangle
      ref={ref}
      {...props}
      bounds={L.latLngBounds(topLeft, bottomRight)}
    />
  );
});
