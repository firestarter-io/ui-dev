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
import { Ticks } from "react-compound-slider";
import { ApplicationState } from "store";
import { ActionCreators as ViewActionCreators } from "common/store/view/actions";
import { Tick } from "./components";
import Input from "./Input";

export const TRACK_HEIGHT = "24px";
export const THUMB_HEIGHT = "40px";
export const THUMB_WIDTH = "14px";
export const PADDING = "30px";

const Wrapper = styled.div`
  align-self: end;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  margin-bottom: 2px;
  position: relative;
  height: 90px;
`;

const Track = styled.div`
  position: absolute;
  left: ${PADDING};
  right: calc(${PADDING} - 1px);
  box-sizing: border-box;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0px;
  border: 1px solid rgb(155, 155, 155);
  top: 26px;
  height: 24px;
  pointer-events: none;
`;

const TicksWrapper = styled.div`
  height: 10px;
  width: calc(100% - ${PADDING});
  margin-top: -26px;
  position: relative;
  z-index: 30;
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

  const start = 0;
  const end = campaign.timesteps.length - 1;

  const domain = [start, end];

  const spread = end - start;

  const stepSize = 1;
  const noOfSteps = campaign.timesteps.length;

  const ticks = Array.from({ length: noOfSteps }).map(
    (_, i) => domain[0] + i * stepSize
  );

  const formatTicks = (d: number) => {
    const timestep = campaign.timesteps[d].timestamp;
    const date = new Date(timestep);
    return date.getHours().toString();
  };

  return (
    <Wrapper>
      <Track />
      <Ticks values={ticks}>
        {({ ticks }) => (
          <TicksWrapper>
            {ticks.map((tick) => {
              const position = (100 * (tick.value - start)) / spread;

              return (
                <Tick
                  key={tick.id}
                  format={formatTicks}
                  tick={tick}
                  count={ticks.length}
                  position={position}
                />
              );
            })}
          </TicksWrapper>
        )}
      </Ticks>
      <Input
        type="range"
        value={currentTimestepValue}
        min={start}
        max={end}
        step={stepSize}
        onInput={(e) => {
          dispatch(
            ViewActionCreators.SetCurrentTimestep(
              (e.target as HTMLInputElement).value
            )
          );
        }}
      />
    </Wrapper>
  );
};

export default TimeSlider;
