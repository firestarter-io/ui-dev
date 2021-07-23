/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import { ActionType, createAction } from "typesafe-actions";

export enum ActionTypes {
  /**
   * Requests new campaign to begin
   */
  REQUEST_NEW_CAMPAIGN = "campaign/REQUEST_NEW_CAMPAIGN",
  /**
   * Recieve Campaign Extent bounds
   */
  RECEIVE_EXTENT_BOUNDS = "campaign/RECEIVE_EXTENT_BOUNDS",
}

export interface NewCampaignPayload {
  latlng: L.LatLng;
}

export const ActionCreators = {
  RequestNewCampaign: createAction(
    ActionTypes.REQUEST_NEW_CAMPAIGN,
    (payload: NewCampaignPayload) => payload
  )(),
  ReceiveExtentBounds: createAction(
    ActionTypes.RECEIVE_EXTENT_BOUNDS,
    (payload: L.LatLngBounds[]) => payload
  )(),
};

export type Action = ActionType<typeof ActionCreators>;
