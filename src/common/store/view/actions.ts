/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import { ActionType, createAction } from "typesafe-actions";

export enum ActionTypes {
  /**
   * Sets the current timestep being viewed
   */
  SET_CURRENT_TIMESTEP = "view/SET_CURRENT_TIMESTEP",
}

export const ActionCreators = {
  SetCurrentTimestep: createAction(
    ActionTypes.SET_CURRENT_TIMESTEP,
    (payload: string) => payload
  )(),
};

export type Action = ActionType<typeof ActionCreators>;
