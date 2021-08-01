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
   * Requests total refresh of server (wiping any in-memory data on the server)
   */
  RESTART_SERVER = "server/RESTART_SERVER",
}

export const ActionCreators = {
  SaveMapReference: createAction(ActionTypes.RESTART_SERVER)(),
};

export type Action = ActionType<typeof ActionCreators>;
