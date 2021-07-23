/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import { Action, ActionTypes } from "./actions";

export interface State {
  /**
   * Array of extent bounds
   */
  extentBounds: L.LatLngBounds[];
}

const initialState: State = { extentBounds: [] };

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.RECEIVE_EXTENT_BOUNDS:
      return {
        ...state,
        extentBounds: [...state.extentBounds, ...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
