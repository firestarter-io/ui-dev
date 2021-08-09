/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  /* ---------- General Page Styles ---------- */

  $linkcolor: #0078A8;

  html {
    box-sizing: border-box;
    overflow-x: hidden;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  html {
    font-family: Arial, Helvetica, sans-serif;
  }

  a {
    text-decoration: none;
    color: $linkcolor;
  }
  a:visited {
    color: $linkcolor;
  }
  a:hover {
    text-decoration: underline;
  }

  button.btn {
    cursor: pointer;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
  }

  button.btn-link {
    background-color: white;
    color: $linkcolor;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    font: inherit;

    &:hover{
        text-decoration: underline;
    }

    &.menu {
        display: block;
        margin-bottom: 1em;
        margin-left: 1em;

        &:last-child{
          margin-bottom: 2em;
        }
    }
  }

`;

export default GlobalStyles;
