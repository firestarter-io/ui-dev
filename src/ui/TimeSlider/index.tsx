/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React from "react";
import styled from "styled-components";
import Input from "./Input";

const Wrapper = styled.div`
  align-self: end;
  background-color: #ffffff;
  border: 2px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const TimeSlider = () => {
  const [value, setValue] = React.useState("70");

  return (
    <Wrapper>
      <Input
        type="range"
        onInput={(e) => {
          setValue((e.target as HTMLInputElement).value);
        }}
        value={value}
        // @ts-ignore
        style={{ width: "100%", "--min": 0, "--max": 100, "--val": value }}
      />
    </Wrapper>
  );
};

export default TimeSlider;
