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
  Rectangle,
} from "react-leaflet";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators as CampaignActionCreators } from "common/store/campaign/actions";
import { ApplicationState } from "store";
import LayersControl from "./LayersControl";
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
    },
  });
  return null;
};

interface MapProps {
  setMap: React.Dispatch<React.SetStateAction<L.Map>>;
}

const Map: React.FC<MapProps> = ({ setMap }: MapProps) => {
  const [token, setToken] = useState("");
  const extents = useSelector(
    (state: ApplicationState) => state.campaign?.extents
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
        setMap(map);
      }}
      center={{ lat: 34.6, lng: -118.4 }}
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

      <LayersControl token={token} />

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
