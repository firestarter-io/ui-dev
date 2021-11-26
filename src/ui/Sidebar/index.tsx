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
import { GiMagnifyingGlass } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { ActionCreators as ViewActionCreators } from "common/store/view/actions";
import { ActionCreators as ServerActionCreators } from "common/store/server/actions";
import Sidebar from "./Sidebar";
import Tab from "./Tab";

export enum NavTabs {
  HOME = "home",
  LAYERS = "layers",
  ANALYZE = "analyze",
  CLEAR = "clear",
  SETTINGS = "settings",
}

interface Props {
  map: L.Map;
}

/**
 * Left Sidebar UI component
 */
const SidebarComponent: React.FC<Props> = ({ map }: Props) => {
  const [openTab, setOpenTab] = useState<NavTabs | undefined>();
  const dispatch = useDispatch();

  const onClose = () => {
    setOpenTab(undefined);
    dispatch(ViewActionCreators.SetCurrentNavTab(undefined));
  };

  const onOpen = (id: NavTabs) => {
    setOpenTab(id);
    dispatch(ViewActionCreators.SetCurrentNavTab(id));
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
      <Tab
        id={NavTabs.HOME}
        header="Home"
        icon={<FiHome />}
        onClose={onClose}
        active
      >
        <p>Welcome to the FireStarter develpment UI. </p>
        <p>
          This react-leaflet is designed for quick analysis of the underlying
          firestarter algorithm, which lives in the node-altorithm repository.
        </p>
        <p>Click the map to begin a campaign at that point.</p>
      </Tab>

      <Tab id={NavTabs.LAYERS} header="Custom Layer Types" icon={<FiLayers />}>
        <p>Custom layers tab</p>
      </Tab>

      <Tab id={NavTabs.ANALYZE} header="Analysis" icon={<GiMagnifyingGlass />}>
        <p>Groundcover Analysis</p>
        <div id="fuel-13-analysis-readout" />
      </Tab>

      <Tab
        id={NavTabs.CLEAR}
        header="Clear"
        icon={<GrPowerReset />}
        anchor="bottom"
        quickClick={() => {
          dispatch(ServerActionCreators.RestartServer());
        }}
      >
        <p>Reset the campaign</p>
      </Tab>

      <Tab
        id={NavTabs.SETTINGS}
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
