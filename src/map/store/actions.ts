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
   * Saves L.Map reference in store
   */
  SAVE_MAP_REFERENCE = "map/SAVE_MAP_REFERENCE",
}

export const ActionCreators = {
  SaveMapReference: createAction(
    ActionTypes.SAVE_MAP_REFERENCE,
    (payload: L.Map) => payload
  )<L.Map>(),
};

export type Action = ActionType<typeof ActionCreators>;
