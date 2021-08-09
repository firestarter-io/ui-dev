/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import * as React from "react";
import { SliderItem } from "react-compound-slider";

interface TickProps {
  tick: SliderItem;
  count: number;
  position: number;
  format: (val: number) => string;
}

/**
 * Custom tick component for react compound slider
 */
export const Tick: React.FC<TickProps> = ({
  tick,
  count,
  position,
  format,
}: TickProps) => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          marginTop: 14,
          width: 1,
          height: 10,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          left: `${position}%`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          marginTop: 35,
          fontSize: 10,
          textAlign: "center",
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${position}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
};
