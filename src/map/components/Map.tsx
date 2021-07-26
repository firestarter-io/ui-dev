/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React, { useEffect, useState } from "react";
import * as L from "leaflet";
import styled from "styled-components";
import {
  MapContainer as UnstyledMapContainer,
  useMapEvents,
  LayersControl,
  Rectangle,
} from "react-leaflet";
import { ImageMapLayer, DynamicMapLayer } from "react-esri-leaflet";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators as CampaignActionCreators } from "common/store/campaign/actions";
import { ApplicationState } from "store";
import { getEsriToken } from "../../utils/esri";

const MapContainer = styled(UnstyledMapContainer)`
  height: 100%;
  width: 100%;
`;

const MapEvents: React.FC = () => {
  const dispatch = useDispatch();

  useMapEvents({
    click: (e) => {
      dispatch(CampaignActionCreators.RequestNewCampaign({ latlng: e.latlng }));
      // console.log(e.latlng);
      // fetch("/api/campaign", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     latlng: e.latlng,
      //     zoom: map.getZoom(),
      //   }),
      // })
      //   .then((r) => r.json())
      //   .then((r) => {
      //     if (r.extentBounds) {
      //       const square = L.rectangle(
      //         L.latLngBounds(
      //           r.extentBounds._northEast,
      //           r.extentBounds._southWest
      //         )
      //       );
      //       square.addTo(map);
      //     }
      //   })
      //   .catch((e) => console.log(e));
    },
    // zoom() {
    //   console.log(map.getZoom());
    // },
  });
  return null;
};

interface MapProps {
  setMap: React.Dispatch<React.SetStateAction<L.Map>>;
}

const Map: React.FC<MapProps> = ({ setMap }: MapProps) => {
  const [token, setToken] = useState("");
  const extentBounds = useSelector(
    (state: ApplicationState) => state.campaign.extentBounds
  );

  useEffect(() => {
    getEsriToken("JIFxHtUs7w96394I", "8068058a0804412eafe2ddbd6f78e961").then(
      (token) => {
        console.log(token);
        setToken(token);
      }
    );
  }, []);

  return (
    <MapContainer
      doubleClickZoom={false}
      id="mapId"
      zoom={12}
      whenCreated={(map) => {
        // dispatch(MapActionCreators.SaveMapReference(map))
        setMap(map);
      }}
      center={{ lat: 34.6, lng: -118.4 }}
    >
      <MapEvents />
      {extentBounds &&
        extentBounds.map((bounds, i) => (
          <Rectangle key={`bounds-${i}`} bounds={Object.values(bounds)} />
        ))}
      <LayersControl collapsed={false}>
        {token && (
          <LayersControl.BaseLayer name="ESRI Aspect" checked>
            <ImageMapLayer
              url="https://elevation.arcgis.com/arcgis/rest/services/WorldElevation/Terrain/ImageServer"
              renderingRule={{ rasterFunction: "Aspect_Map" }}
              token={token}
            />
          </LayersControl.BaseLayer>
        )}
        <LayersControl.BaseLayer name="USFS Wildfire Probability">
          <DynamicMapLayer
            url="https://apps.fs.usda.gov/arcx/rest/services/RDW_Wildfire/ProbabilisticWildfireRisk/MapServer"
            layers={[0]}
            format="png32"
            f="image"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="USFS 13 Fuel Models">
          <ImageMapLayer url="https://apps.fs.usda.gov/fsgisx01/rest/services/RDW_Landfire/US_13AndersonFBFM_v200/ImageServer" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="LANDFIRE Fuels">
          <DynamicMapLayer
            url="https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer"
            layers={[21]}
            format="png32"
            f="image"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {token && (
        <EsriLeafletGeoSearch
          useMapBounds={false}
          providers={{
            arcgisOnlineProvider: {
              apikey: token,
            },
          }}
        />
      )}
    </MapContainer>
  );
};

export default Map;
