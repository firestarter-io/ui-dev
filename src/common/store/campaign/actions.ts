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
import { Campaign } from "./reducer";

export enum ActionTypes {
  /**
   * Requests new campaign to begin
   */
  REQUEST_NEW_CAMPAIGN = "campaign/REQUEST_NEW_CAMPAIGN",
  /**
   * Recieve Campaign Extent bounds
   */
  RECEIVE_NEW_CAMPAIGN = "campaign/RECEIVE_NEW_CAMPAIGN",
}

export interface NewCampaignRequestPayload {
  latlng: L.LatLng;
}

export const ActionCreators = {
  RequestNewCampaign: createAction(
    ActionTypes.REQUEST_NEW_CAMPAIGN,
    (payload: NewCampaignRequestPayload) => payload
  )(),
  ReceiveNewCampaign: createAction(
    ActionTypes.RECEIVE_NEW_CAMPAIGN,
    (payload: Campaign) => payload
  )(),
};

export type Action = ActionType<typeof ActionCreators>;
