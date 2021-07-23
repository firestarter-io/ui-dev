/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { PayloadMetaAction } from "typesafe-actions";
import { ActionCreators, ActionTypes, NewCampaignPayload } from "./actions";

function* handleRequestNewCampaign(
  action: PayloadMetaAction<
    ActionTypes.REQUEST_NEW_CAMPAIGN,
    NewCampaignPayload,
    undefined
  >
): Generator {
  try {
    console.log(action.payload);
    const response = (yield call(
      axios.post,
      "/api/campaign",
      action.payload
    )) as AxiosResponse<L.LatLngBounds[]>;

    console.log(response.data);

    yield put(ActionCreators.ReceiveExtentBounds(response.data));
  } catch (e) {
    console.log(e);
  }
}

function* watchServerRefresh(): Generator {
  yield takeEvery(ActionTypes.REQUEST_NEW_CAMPAIGN, handleRequestNewCampaign);
}

function* serverSagas(): Generator {
  yield all([fork(watchServerRefresh)]);
}

export default serverSagas;
