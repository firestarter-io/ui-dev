/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { ApplicationState } from "../store";

const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  margin: 10px;
  z-index: 10000;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

const UIOverlay: React.FC = () => {
  //  const useActiveArea = useSelector(state => state.useActiveArea)
  //  const openTab = useSelector(state => state.sidebarTab)
  //  const showActiveArea = (openTab === 'externalConrols' || openTab === 'ui') ? true : false;
  //  const style = showActiveArea
  //     ? {}
  //     : {border: 'none'}

  const map = useSelector((state: ApplicationState) => state.map.ref);

  return (
    <Wrapper>
      <Sidebar map={map} />
      {/* {useActiveArea && <ActiveAreaExternal className="external" style={style} map={props.map} />} */}
    </Wrapper>
  );
};

export default UIOverlay;
