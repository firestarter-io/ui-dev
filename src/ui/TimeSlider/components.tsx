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
import {
  SliderItem,
  GetHandleProps,
  GetTrackProps,
} from "react-compound-slider";

interface HandleProps {
  domain: number[];
  handle: SliderItem;
  getHandleProps: GetHandleProps;
}

/**
 * Custom handle component for react compound slider
 */
export const Handle: React.FC<HandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps,
}: HandleProps) => (
  <div
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    style={{
      left: `${percent}%`,
      position: "absolute",
      marginLeft: "-11px",
      marginTop: "-8px",
      zIndex: 2,
      width: 15,
      height: 40,
      cursor: "pointer",
      borderRadius: "5px",
      boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#34568f",
    }}
    {...getHandleProps(id)}
  />
);

interface TrackProps {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
}

/**
 * Custom track component for react compound slider
 */
export const Track: React.FC<TrackProps> = ({
  source,
  target,
  getTrackProps,
}: TrackProps) => (
  <div
    style={{
      position: "absolute",
      height: 14,
      zIndex: 1,
      // backgroundColor: "#7aa0c4",
      borderRadius: 7,
      cursor: "pointer",
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`,
    }}
    {...getTrackProps()}
  />
);

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
  console.log(position);
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
        }}
      />
      <div
        style={{
          position: "absolute",
          marginTop: 30,
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
