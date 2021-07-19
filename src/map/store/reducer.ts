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
   * Reference to the map's underlying L.Map instance
   */
  ref?: L.Map;
}

const initialState: State = {};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SAVE_MAP_REFERENCE:
      return {
        ...state,
        ref: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
