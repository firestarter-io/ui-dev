/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React, { useState } from "react";
import { FiChevronLeft, FiHome, FiLayers, FiSettings } from "react-icons/fi";
import Sidebar from "./Sidebar";
import Tab from "./Tab";

interface Props {
  map: L.Map;
}

const SidebarComponent: React.FC<Props> = ({ map }: Props) => {
  const [openTab, setOpenTab] = useState<string | false>("home");

  const onClose = () => {
    setOpenTab(false);
  };

  const onOpen = (id) => {
    setOpenTab(id);
  };

  const setTab = (id) => {
    setOpenTab(id);
  };

  return (
    <Sidebar
      map={map}
      position="left"
      collapsed={!openTab}
      selected={openTab}
      closeIcon={<FiChevronLeft />}
      onClose={onClose}
      onOpen={onOpen}
      panMapOnChange
      rehomeControls
    >
      <Tab id="home" header="Home" icon={<FiHome />} onClose={onClose} active>
        <p>
          Welcome to the React-Leaflet V3 custom components library. This
          example page shows off some of the custom components that have been
          built and adapted for react-leaflet v3.
        </p>
        <p>
          <button className="menu btn-link" onClick={() => setTab("ui")}>
            Layout Components
          </button>
          <button
            className="menu btn-link"
            onClick={() => setTab("externalConrols")}
          >
            Externalized Controls
          </button>
          <button className="menu btn-link" onClick={() => setTab("layers")}>
            Custom Layers
          </button>
          <button className="menu btn-link" onClick={() => setTab("uilayers")}>
            Markers and Popups
          </button>
          <button
            className="menu btn-link"
            onClick={() => setTab("vectorlayers")}
          >
            Custom Path Components
          </button>
          <button
            className="menu btn-link"
            onClick={() => setTab("esrileaflet")}
          >
            Esri-Leaflet for React-Leaflet
          </button>
        </p>
        <p>Check out the github page for more information.</p>
      </Tab>

      <Tab id="layers" header="Custom Layer Types" icon={<FiLayers />}>
        <p>Custom layers tab</p>
      </Tab>

      <Tab
        id="settings"
        header="Settings"
        icon={<FiSettings />}
        anchor="bottom"
      >
        <p>Some content in here</p>
      </Tab>
    </Sidebar>
  );
};

export default SidebarComponent;
