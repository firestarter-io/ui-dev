/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import { Action, ActionTypes } from "./actions";

export type State = {
  /**
   * The current timestep of the campaign being viewed
   */
  currentTimestep: number[];
};

const initialState: State = {
  currentTimestep: [0],
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_TIMESTEP:
      return {
        ...state,
        currentTimestep: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
