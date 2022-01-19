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
  useMap,
} from "react-leaflet";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators as CampaignActionCreators } from "common/store/campaign/actions";
import { ApplicationState } from "store";
import { NavTabs } from "ui/Sidebar";
import { getMapLocation, updatePermalink } from "utils/permalink";
import { DEFAULT_CENTER } from "map/constants";
import LayersControl from "./LayersControl";
import { getEsriToken } from "../../utils/esri";
import { CampaignCells } from "./CampaignCells";
import {
  InspectSectionIds,
  InspectableRasterLayer,
} from "./InspectableRasterLayer";

const MapContainer = styled(UnstyledMapContainer)`
  height: 100%;
  width: 100%;
`;

const MapEvents: React.FC = () => {
  const dispatch = useDispatch();

  const map = useMap();

  useMapEvents({
    click: (e) => {
      console.log(e.latlng);
      dispatch(CampaignActionCreators.RequestNewCampaign({ latlng: e.latlng }));
    },
    moveend: () => {
      updatePermalink(map.getCenter(), map.getZoom());
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
  const inspectModeActive = currentNavTab === NavTabs.INSPECT;

  useEffect(() => {
    getEsriToken("JIFxHtUs7w96394I", "8068058a0804412eafe2ddbd6f78e961").then(
      (token) => {
        setToken(token);
      }
    );
  }, []);

  const { center, zoom } = getMapLocation({ center: DEFAULT_CENTER, zoom: 12 });

  return (
    <MapContainer
      doubleClickZoom={false}
      center={center}
      zoom={zoom}
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

      {inspectModeActive && (
        <>
          <InspectableRasterLayer
            name="Anderson's 13 Fuel Models"
            id={InspectSectionIds.FUEL13}
            url="https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer"
            sublayer="19"
            format="png32"
            f="image"
            exportType="export"
          />
          <InspectableRasterLayer
            name="Scott and Burgan's 40 Fuel Models"
            id={InspectSectionIds.FUEL13}
            url="https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer"
            sublayer="10"
            format="png32"
            f="image"
            exportType="export"
          />
        </>
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
