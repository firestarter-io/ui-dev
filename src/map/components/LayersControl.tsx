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
import { LayersControl as RLLayersControl, TileLayer } from "react-leaflet";
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
      <RLLayersControl.BaseLayer name="Empty" checked>
        <TileLayer url="" />
      </RLLayersControl.BaseLayer>
      <RLLayersControl.BaseLayer name="OSM Hot">
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
      </RLLayersControl.BaseLayer>
      {token && (
        <>
          <RLLayersControl.BaseLayer name="ESRI Aspect">
            <ImageMapLayer
              url="https://elevation.arcgis.com/arcgis/rest/services/WorldElevation/Terrain/ImageServer"
              renderingRule={{ rasterFunction: "Aspect_Map" }}
              token={token}
            />
          </RLLayersControl.BaseLayer>
          <RLLayersControl.BaseLayer name="ESRI Slope Degrees">
            <ImageMapLayer
              url="https://elevation.arcgis.com/arcgis/rest/services/WorldElevation/Terrain/ImageServer"
              renderingRule={{ rasterFunction: "Slope_Degrees_Map" }}
              token={token}
            />
          </RLLayersControl.BaseLayer>
        </>
      )}
      <RLLayersControl.BaseLayer name="USFS Wildfire Probability">
        <DynamicMapLayer
          url="https://apps.fs.usda.gov/arcx/rest/services/RDW_Wildfire/ProbabilisticWildfireRisk/MapServer"
          layers={[0]}
          format="png32"
          f="image"
        />
      </RLLayersControl.BaseLayer>
      {/* Backup in case LANDFIRE goes down again: */}
      {/* <RLLayersControl.BaseLayer name="USFS 13 Fuel Models">
        <ImageMapLayer url="https://apps.fs.usda.gov/fsgisx01/rest/services/RDW_Landfire/US_13AndersonFBFM_v200/ImageServer" />
      </RLLayersControl.BaseLayer> */}
      <RLLayersControl.BaseLayer name="LANDFIRE 13 Fuels">
        <DynamicMapLayer
          url="https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer"
          layers={[19]}
          format="png32"
          f="image"
        />
      </RLLayersControl.BaseLayer>
      <RLLayersControl.BaseLayer name="LANDFIRE 40 Fuels">
        <DynamicMapLayer
          url="https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer"
          layers={[10]}
          format="png32"
          f="image"
        />
      </RLLayersControl.BaseLayer>
    </RLLayersControl>
  );
};

export default LayersControl;
