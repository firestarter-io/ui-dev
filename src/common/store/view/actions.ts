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
import { NavTabs } from "ui/Sidebar";

export enum ActionTypes {
  /**
   * Sets the current timestep being viewed
   */
  SET_CURRENT_TIMESTEP = "view/SET_CURRENT_TIMESTEP",
  /**
   * Sets current navigation tab
   */
  SET_CURRENT_NAV_TAB = "view/SET_CURRENT_NAV_TAB",
}

export const ActionCreators = {
  SetCurrentTimestep: createAction(
    ActionTypes.SET_CURRENT_TIMESTEP,
    (payload: string) => payload
  )(),
  SetCurrentNavTab: createAction(
    ActionTypes.SET_CURRENT_NAV_TAB,
    (payload: NavTabs | undefined) => payload
  )<NavTabs | undefined>(),
};

export type Action = ActionType<typeof ActionCreators>;
