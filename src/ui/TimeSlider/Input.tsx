/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import styled, { css } from "styled-components";
import { THUMB_HEIGHT, TRACK_HEIGHT } from "./TimeSlider";

const thumbHeight = "40px";
const thumbWidth = "14px";
const thumbC = "#34568f";
const filllC = "#ffc069";

const track = css`
  box-sizing: border-box;
  height: 24px;
  background: transparent;
  border-radius: 0px;
  /* border: 1px solid green; */
`;

const fill = css`
  height: ${TRACK_HEIGHT};
  background: ${filllC};
  border-radius: 4px;
`;

const thumb = css`
  box-sizing: border-box;
  width: ${thumbWidth};
  height: ${thumbHeight};
  position: "absolute";
  border-radius: 3px;
  background: ${thumbC};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  margin-top: -8px;
`;

/**
 * Styled input slider component
 */
const Input = styled.input`
  position: absolute;
  left: 22px;
  right: 22px;
  top: 26px;
  width: calc(100% - 44px);
  z-index: 50;

  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
  }

  &:focus::-webkit-slider-thumb {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:focus::-moz-range-thumb {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:focus::-ms-thumb {
    outline: -webkit-focus-ring-color auto 5px;
  }

  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--val) - var(--min)) / var(--range));
  --sx: calc(0.5 * ${THUMB_HEIGHT} + var(--ratio) * (100% - ${THUMB_HEIGHT}));

  margin: 0;
  padding: 0;
  height: ${THUMB_HEIGHT};
  background: transparent;
  font: 1em/1 arial, sans-serif;

  &::-webkit-slider-runnable-track {
    ${track};
  }

  &::-moz-range-track {
    ${track};
  }

  &::-ms-track {
    ${track};
  }

  &::-moz-range-progress {
    ${fill};
  }

  &::-ms-fill-lower {
    ${fill};
  }

  &::-webkit-slider-thumb {
    margin-top: calc(0.5 * (${TRACK_HEIGHT} - ${thumbHeight}));
    margin-left: "-20px";
    ${thumb};
  }

  &::-moz-range-thumb {
    ${thumb};
  }

  &::-ms-thumb {
    margin-top: 0;
    ${thumb};
  }

  &::-ms-tooltip {
    display: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }
`;

export default Input;
