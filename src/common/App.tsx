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
import GlobalStyles from "./GlobalStyles";
import Map from "../map/components/Map";
import UI from "../ui";
import { ApplicationState } from "../store";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const App: React.FC = () => {
  const map = useSelector((state: ApplicationState) => state.map.ref);

  return (
    <Wrapper>
      <GlobalStyles />
      <Map />
      {map && <UI />}
    </Wrapper>
  );
};

export default App;
