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
import axios from "axios";
import { ActionTypes } from "./actions";

function* serverRefresh(): Generator {
  try {
    yield call(axios.get, "/api/restart");
    yield put({ type: "REFRESH" });
  } catch (e) {
    console.log(e);
  }
}

function* watchServerRefresh(): Generator {
  yield takeEvery(ActionTypes.RESTART_SERVER, serverRefresh);
}

function* serverSagas(): Generator {
  yield all([fork(watchServerRefresh)]);
}

export default serverSagas;
