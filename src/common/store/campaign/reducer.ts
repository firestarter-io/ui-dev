/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import { Matrix } from "mathjs";
import { Action, ActionTypes } from "./actions";

interface Timestep {
  /**
   * Index of the timestep in a campaign's timestep array
   */
  index: number;
  /**
   * The unix timestamp of the time step
   */
  timestamp: number;
  /**
   * The human readable time of the timestep
   */
  time: string;
  /**
   * Weather forecast for the hour of the current TimeStep
   */
  weather: object;
  /**
   * Array of events that occurred in that timestep, if any
   */
  events: object[];
  /**
   * Array of extents currently active in the timestep
   */
  extents: {
    latLngBounds: L.LatLngBounds;
    bounds: L.Bounds;
    pixelBounds: L.Bounds;
    width: number;
    height: number;
    origin: L.Point;
    averageDistance: number;
    burnMatrix: Matrix;
  }[];
}

export type Campaign = {
  id: string;
  startTime: number;
  extents: {
    bounds: L.LatLngBounds;
    averageDistance: number;
  }[];
  timesteps: Timestep[];
};

export type State = Campaign | null;

const initialState: State = null;

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.RECEIVE_NEW_CAMPAIGN:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
