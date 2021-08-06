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
import * as lodash from "lodash";
import { ApplicationState } from "store";
import { ActionCreators as ViewActionCreators } from "common/store/view/actions";
import { Tick } from "./components";
import Input from "./Input";

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

  const start = lodash.first(campaign.timesteps).timestamp;
  const end = lodash.last(campaign.timesteps).timestamp;

  const domain = [start, end];

  const spread = end - start;

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
      <div
        style={{
          position: "relative",
          width: "100%",
          margin: "10px 0px 40px",
        }}
      >
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
        <Ticks values={ticks}>
          {({ ticks }) => (
            <div className="slider-ticks" style={{ marginTop: "-36px" }}>
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
            </div>
          )}
        </Ticks>
      </div>
    </Wrapper>
  );
};

export default TimeSlider;
