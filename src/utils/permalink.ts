/*
 * Firestarter.io
 *
 * Copyright (C) 2022 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import { LatLngLiteral } from "leaflet";
import { DEFAULT_CENTER } from "map/constants";

interface Permalink {
  zoom: number;
  center: LatLngLiteral;
}

export const getMapLocation = (permalink: Permalink): Permalink => {
  let { zoom, center = DEFAULT_CENTER } = permalink;
  zoom = zoom || zoom === 0 ? zoom : 18;

  if (window.location.hash !== "") {
    const hash = window.location.hash.replace("#", "");
    const parts = hash.split(",");
    if (parts.length >= 3) {
      center = {
        lat: parseFloat(parts[0]),
        lng: parseFloat(parts[1]),
      };
      zoom = parseInt(parts[2].slice(0, -1), 10);
    }
  }
  return { zoom, center };
};

export const updatePermalink = (center: LatLngLiteral, zoom: number): void => {
  const hash =
    // eslint-disable-next-line prefer-template
    "#" +
    Math.round(center.lat * 100000) / 100000 +
    "," +
    Math.round(center.lng * 100000) / 100000 +
    "," +
    zoom +
    "z";

  window.history.replaceState("", "", hash);
};
