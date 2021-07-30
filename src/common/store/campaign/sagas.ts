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
import {
  ActionCreators,
  ActionTypes,
  NewCampaignRequestPayload,
} from "./actions";
import { Campaign } from "./reducer";

function* handleRequestNewCampaign(
  action: PayloadMetaAction<
    ActionTypes.REQUEST_NEW_CAMPAIGN,
    NewCampaignRequestPayload,
    undefined
  >
): Generator {
  try {
    console.log(action.payload);
    const response = (yield call(
      axios.post,
      "/api/campaign",
      action.payload
    )) as AxiosResponse<Campaign>;

    console.log(response.data);

    yield put(ActionCreators.ReceiveNewCampaign(response.data));
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
