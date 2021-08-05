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
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import * as lodash from "lodash";
import { ApplicationState } from "store";
import { ActionCreators as ViewActionCreators } from "common/store/view/actions";
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

/**
 * Primary time slider component which offers the user the ability to play back the
 * timesteps of a campaign, or selectively choose which one to view
 */
const TimeSlider: React.FC = () => {
  // Dummy campaign data for now:
  const campaign = useSelector((state: ApplicationState) => state.campaign);
  const currentTimestepValue = useSelector(
    (state: ApplicationState) => state.view.currentTimestep
  );
  const dispatch = useDispatch();

  const domain = [
    lodash.first(campaign.timesteps).timestamp,
    lodash.last(campaign.timesteps).timestamp,
  ];

  const stepSize =
    campaign.timesteps[1].timestamp - campaign.timesteps[0].timestamp;
  const noOfSteps = campaign.timesteps.length;

  const ticks = Array.from({ length: noOfSteps }).map(
    (_, i) => domain[0] + i * stepSize
  );

  const formatTicks = (d: number) => {
    const date = new Date(d);
    return date.getHours().toString();
  };

  return (
    <Wrapper>
      <Slider
        mode={1}
        step={stepSize}
        domain={domain}
        rootStyle={sliderStyle}
        onChange={(value) => {
          dispatch(
            ViewActionCreators.SetCurrentTimestep([value as unknown as number])
          );
        }}
        values={[0]}
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
        <Ticks values={ticks}>
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
