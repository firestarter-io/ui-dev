/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
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
  Rectangle,
} from "react-leaflet";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators as CampaignActionCreators } from "common/store/campaign/actions";
import { ApplicationState } from "store";
import { NavTabs } from "ui/Sidebar";
import LayersControl from "./LayersControl";
import { getEsriToken } from "../../utils/esri";
import { CampaignCells } from "./CampaignCells";
import {
  AnalysisSectionIds,
  InspectableRasterLayer,
} from "./InspectableRasterLayer";

const MapContainer = styled(UnstyledMapContainer)`
  height: 100%;
  width: 100%;
`;

const MapEvents: React.FC = () => {
  const dispatch = useDispatch();

  useMapEvents({
    click: (e) => {
      console.log(e.latlng);
      dispatch(CampaignActionCreators.RequestNewCampaign({ latlng: e.latlng }));
    },
  });
  return null;
};

interface MapProps {
  setMap: React.Dispatch<React.SetStateAction<L.Map>>;
}

/**
 * The central leaflet map of the application
 */
const Map: React.FC<MapProps> = ({ setMap }: MapProps) => {
  const [token, setToken] = useState("");
  const campaign = useSelector((state: ApplicationState) => state.campaign);
  const extents = useSelector(
    (state: ApplicationState) => state.campaign?.extents
  );
  const currentNavTab = useSelector(
    (state: ApplicationState) => state.view.currentNavTab
  );
  const analyzeModeActive = currentNavTab === NavTabs.ANALYZE;

  useEffect(() => {
    getEsriToken("JIFxHtUs7w96394I", "8068058a0804412eafe2ddbd6f78e961").then(
      (token) => {
        setToken(token);
      }
    );
  }, []);

  return (
    <MapContainer
      doubleClickZoom={false}
      center={{ lat: 34.64926102336086, lng: -118.55522867292167 }}
      zoom={12}
      id="mapId"
      preferCanvas
      whenCreated={(map) => {
        // @ts-ignore
        window.map = map;
        setMap(map);
      }}
    >
      <MapEvents />

      {extents &&
        extents.map((extent, i) => {
          return (
            <Rectangle
              color="black"
              fillOpacity={0}
              key={`bounds-${i}`}
              bounds={Object.values(extent.bounds)}
            />
          );
        })}

      {campaign && <CampaignCells />}

      <LayersControl token={token} />

      {analyzeModeActive && (
        <InspectableRasterLayer
          name="Anderson's 13 Fuel Models"
          id={AnalysisSectionIds.FUEL13}
          url="https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer"
          sublayer="19"
          format="png32"
          f="image"
          exportType="export"
        />
      )}

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
