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
import styled from "styled-components";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { Handle, Track, Tick } from "./components";

const sliderStyle: React.CSSProperties = {
  margin: "10px 0 40px 0",
  position: "relative",
  width: "100%",
};

const railStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: 24,
  borderRadius: 0,
  cursor: "pointer",
  border: "1px solid rgb(155,155,155)",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
};

const Wrapper = styled.div`
  align-self: end;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  margin-bottom: 2px;
`;

const TimeSlider: React.FC = () => {
  const [value, setValue] = React.useState([70]);

  const domain = [48, 84];

  const formatTicks = (d: number) => {
    const feet = Math.floor(d / 12);
    const inches = d % 12;

    return `${feet} ft ${inches ? `${inches} in` : ""}`;
  };

  return (
    <Wrapper>
      <Slider
        mode={1}
        step={0.1}
        domain={domain}
        rootStyle={sliderStyle}
        // @ts-ignore
        onChange={(value) => setValue(value)}
        values={value}
      >
        <Rail>
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks values={[48, 54, 60, 66, 72, 78, 84]}>
          {({ ticks }) => (
            <div className="slider-ticks" style={{ marginTop: "2px" }}>
              {ticks.map((tick) => (
                <Tick
                  key={tick.id}
                  format={formatTicks}
                  tick={tick}
                  count={ticks.length}
                />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </Wrapper>
  );
};

export default TimeSlider;
