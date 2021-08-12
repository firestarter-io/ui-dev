/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import { Matrix } from "mathjs";
import dummycampaign from "common/constants/dummycampaign";
import { Action, ActionTypes } from "./actions";

export interface Timestep {
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
    burnMatrix: any;
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

const campaign: Campaign = JSON.parse(dummycampaign);

const initialState: State = campaign;

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
