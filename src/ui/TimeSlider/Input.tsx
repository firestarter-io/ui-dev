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

const trackH = "24px";
const thumbH = "40px";
const thumbD = "15px";
const thumbC = "#34568f";
const trackC = "rgba(0, 0, 0, 0.1)";
const filllC = "#ffc069";

const track = css`
  box-sizing: border-box;
  height: 4px;
  background: ${trackC};
  border-radius: 0px;
  border: 1px solid rgb(155, 155, 155);
  margin-right: -1px;
`;

const trackFill = css`
  ${track};
  height: ${trackH};
`;

const fill = css`
  height: ${trackH};
  background: ${filllC};
  border-radius: 4px;
`;

const thumb = css`
  box-sizing: border-box;
  width: ${thumbD};
  height: ${thumbH};
  position: "absolute";
  border-radius: 3px;
  background: ${thumbC};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
  cursor: pointer;
`;

/**
 * Styled input slider component
 */
const Input = styled.input`
  width: 100%;

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
  --sx: calc(0.5 * ${thumbH} + var(--ratio) * (100% - ${thumbH}));

  margin: 0;
  padding: 0;
  height: ${thumbH};
  background: transparent;
  font: 1em/1 arial, sans-serif;

  &::-webkit-slider-runnable-track {
    ${trackFill};
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
    margin-top: calc(0.5 * (${trackH} - ${thumbH}));
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
