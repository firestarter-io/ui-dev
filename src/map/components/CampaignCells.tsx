/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React, { useRef, useEffect } from "react";
import * as L from "leaflet";
import { useSelector } from "react-redux";
import { FeatureGroup, useMap } from "react-leaflet";
import { ApplicationState } from "store";
import { Timestep } from "common/store/campaign/reducer";
import math from "utils/math";
import { SCALE } from "utils/config";
import { Cell } from "./Cell";

export const CampaignCells: React.FC = () => {
  const map = useMap();
  const groupRef = useRef<L.FeatureGroup>();

  const timesteps = useSelector(
    (state: ApplicationState) => state.campaign.timesteps
  );
  const currentTimeStepIndex = useSelector(
    (state: ApplicationState) => state.view.currentTimestep
  );
  const currentTimestep: Timestep = timesteps[currentTimeStepIndex];

  useEffect(() => {
    // map.setView(groupRef.current.getBounds().getCenter());
  }, [currentTimeStepIndex]);

  return (
    <FeatureGroup ref={groupRef}>
      {currentTimestep.extents.map((extent) => {
        const cellValues = [];
        const { averageDistance, origin } = extent;
        const burnMatrix = math.SparseMatrix.fromJSON(extent.burnMatrix);

        burnMatrix.map((value, index) => {
          cellValues.push({ value, index });
          return value;
        }, true);

        const cells = cellValues.map(({ index }) => {
          const cellPoint = new L.Point(
            index[1] + origin.x,
            index[0] + origin.y
          );

          const cellPosition = map.unproject(cellPoint, SCALE);

          return (
            <Cell
              key={JSON.stringify(cellPosition)}
              center={cellPosition}
              size={averageDistance}
              fillColor="blue"
            />
          );
        });

        return cells;
      })}
    </FeatureGroup>
  );
};