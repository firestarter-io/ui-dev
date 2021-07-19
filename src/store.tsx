/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { createStore, combineReducers, applyMiddleware } from "redux";

import mapReducer, { State as MapState } from "./map/store/reducer";

/**
 * Combined state of all reducer states
 */
export interface ApplicationState {
  /**
   * State of the central Map component
   */
  map: MapState;
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ map: mapReducer });

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
