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
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Map from "../map/components/Map";
import UI from "../ui";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const App: React.FC = () => {
  const [map, setMap] = useState();

  return (
    <Wrapper>
      <GlobalStyles />
      <Map setMap={setMap} />
      {map && <UI map={map} />}
    </Wrapper>
  );
};

export default App;
