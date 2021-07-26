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
import {
  createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from "redux";
import { all, fork } from "redux-saga/effects";

import mapReducer, { State as MapState } from "map/store/reducer";
import serverSagas from "common/store/server/sagas";
import campaignReducer, {
  State as CampaignState,
} from "common/store/campaign/reducer";
import campaignSagas from "common/store/campaign/sagas";

/**
 * Combined state of all reducer states
 */
export interface ApplicationState {
  /**
   * State of the central Map component
   */
  map: MapState;
  /**
   * State of the current Campaign
   */
  campaign: CampaignState;
}

/**
 * Combines all sagas into one root saga to be linked to redux
 */
function* rootSaga(): Generator {
  yield all([fork(serverSagas), fork(campaignSagas)]);
}

const sagaMiddleware = createSagaMiddleware();

/**
 * Combines all reducers into one root reducer to create the total store state
 */
const appReducer = combineReducers({
  map: mapReducer,
  campaign: campaignReducer,
});

/**
 * Quick action reducer to refresh application state
 */
export const rootReducer = (
  state: ApplicationState,
  action: AnyAction
): ApplicationState => {
  if (action.type === "REFRESH") {
    console.log("in here");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

/**
 * The redux store for the application
 */
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// @ts-ignore
window.store = store;

sagaMiddleware.run(rootSaga);
