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
import { GrPowerReset } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { ActionCreators } from "common/store/server/actions";
import Sidebar from "./Sidebar";
import Tab from "./Tab";

interface Props {
  map: L.Map;
}

/**
 * Left Sidebar UI component
 */
const SidebarComponent: React.FC<Props> = ({ map }: Props) => {
  const [openTab, setOpenTab] = useState<string | false>(false);
  const dispatch = useDispatch();

  const onClose = () => {
    setOpenTab(false);
  };

  const onOpen = (id) => {
    setOpenTab(id);
  };

  // const setTab = (id) => {
  //   setOpenTab(id);
  // };

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
        <p>Welcome to the FireStarter develpment UI. </p>
        <p>
          This react-leaflet is designed for quick analysis of the underlying
          firestarter algorithm, which lives in the node-altorithm repository.
        </p>
        <p>Click the map to begin a campaign at that point.</p>
      </Tab>

      <Tab id="layers" header="Custom Layer Types" icon={<FiLayers />}>
        <p>Custom layers tab</p>
      </Tab>

      <Tab
        id="clear"
        header="Clear"
        icon={<GrPowerReset />}
        anchor="bottom"
        quickClick={() => {
          dispatch(ActionCreators.SaveMapReference());
        }}
      >
        <p>Reset the campaign</p>
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
