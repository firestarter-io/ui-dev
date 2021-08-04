/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React from "react";
import { LayersControl as RLLayersControl } from "react-leaflet";
import { ImageMapLayer, DynamicMapLayer } from "react-esri-leaflet";

interface Props {
  /**
   * ArcGIS Token
   */
  token: string;
}

/**
 * Layers control component which offers several helpful layers to toggle
 */
const LayersControl: React.FC<Props> = ({ token }: Props) => {
  return (
    <RLLayersControl collapsed={false}>
      {token && (
        <RLLayersControl.BaseLayer name="ESRI Aspect" checked>
          <ImageMapLayer
            url="https://elevation.arcgis.com/arcgis/rest/services/WorldElevation/Terrain/ImageServer"
            renderingRule={{ rasterFunction: "Aspect_Map" }}
            token={token}
          />
        </RLLayersControl.BaseLayer>
      )}
      {/* Backup in case LANDFIRE goes down again: */}
      {/* <RLLayersControl.BaseLayer name="USFS Wildfire Probability">
        <DynamicMapLayer
          url="https://apps.fs.usda.gov/arcx/rest/services/RDW_Wildfire/ProbabilisticWildfireRisk/MapServer"
          layers={[0]}
          format="png32"
          f="image"
        />
      </RLLayersControl.BaseLayer> */}
      <RLLayersControl.BaseLayer name="USFS 13 Fuel Models">
        <ImageMapLayer url="https://apps.fs.usda.gov/fsgisx01/rest/services/RDW_Landfire/US_13AndersonFBFM_v200/ImageServer" />
      </RLLayersControl.BaseLayer>
      <RLLayersControl.BaseLayer name="LANDFIRE Fuels">
        <DynamicMapLayer
          url="https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer"
          layers={[21]}
          format="png32"
          f="image"
        />
      </RLLayersControl.BaseLayer>
    </RLLayersControl>
  );
};

export default LayersControl;
