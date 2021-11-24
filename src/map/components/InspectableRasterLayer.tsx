/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React, { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { ApplicationState } from "store";
import styled from "styled-components";
import { NavTabs } from "ui/Sidebar";
import { EsriImageRequest, ImageRequestOptions } from "utils/esri";
import { compareObjectWithTolerance } from "utils/math";

interface Props extends ImageRequestOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<any, any>;
}

const AnalysisCanvas = styled.canvas`
  height: 100%;
  width: 100%;
  pointer-events: none;
  border: 3px solid red;
`;

const LoadingSpinner = styled.img`
  position: absolute;
  top: 160px;
  right: 10px;
  height: 60px;
  width: 60px;
  z-index: 1000000;
`;

export const InspectableRasterLayer: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;

  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>();

  const map = useMap();
  const { height, width } = map.getContainer().getBoundingClientRect();

  const currentNavTab = useSelector(
    (state: ApplicationState) => state.view.currentNavTab
  );

  const layerImageRequest = new EsriImageRequest(rest);

  // @ts-ignore
  window.layerImageRequest = layerImageRequest;

  /**
   * Function to fetch the esri image and draw it to the canvas
   */
  const fetchAndApplyImage = () => {
    if (canvasRef.current && currentNavTab === NavTabs.ANALYZE) {
      const ctx = canvasRef.current.getContext("2d");
      setLoading(true);

      layerImageRequest
        .fetchImage(map.getBounds(), map.getZoom())
        .then((image) => {
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          image.crossOrigin = "*";
          setTimeout(() => {
            ctx.drawImage(
              image as unknown as CanvasImageSource,
              0,
              0,
              width,
              height
            );
            setLoading(false);
          }, 1000);
        });

      layerImageRequest.generateLegend();
    }
  };

  /**
   * Call function to draw image to canvas on mount and on the following map events:
   */
  map.on("moveend zoomend resize", fetchAndApplyImage);

  // const rgbsample: HTMLElement = document.querySelector(".color-sample");
  // const rgbmessage: HTMLElement = document.getElementById("code-text");
  // const valuestring: HTMLElement = document.getElementById("value");

  /**
   * Function to get the latlng of the mouse position, cross reference it against the pixel
   * at that position on the canvas, get the pixel value at that pixel, and then look up
   * that pixel in the layer's legend JSON
   */
  const getPixel = (e: L.LeafletMouseEvent) => {
    const { x, y } = map.latLngToContainerPoint(e.latlng);
    if (!loading && canvasRef.current && currentNavTab === NavTabs.ANALYZE) {
      const ctx = canvasRef.current.getContext("2d");

      const pixelData = ctx.getImageData(x, y, 1, 1);
      const [R, G, B, A] = pixelData.data;
      // rgbsample.style.backgroundColor = `rgba(${R}, ${G}, ${B}, ${A})`;
      // rgbmessage.innerText = `R: ${R}, G: ${G}, B: ${B}`;
      const rgbvalue = { R, G, B, A };
      const value = layerImageRequest._legendJSON.find((symbol) =>
        compareObjectWithTolerance(symbol.rgbvalue, rgbvalue, 1)
      );
      // valuestring.innerHTML = `Value: ${value?.label || ""}`;
    }
  };

  /**
   * When mouse moves on map, run the getpixel function
   */
  map.on("mousemove", getPixel);

  /**
   * Cleanup effect so that when layer dismounts, map handlers are removed
   */
  useEffect(() => {
    return function cleanup() {
      map.off("moveend zoomend resize", fetchAndApplyImage);
      map.off("mousemove", getPixel);
    };
  }, []);

  return (
    <>
      {children}
      <AnalysisCanvas
        height={height}
        width={width}
        ref={canvasRef}
        id="analysis-canvas"
        style={{
          display: currentNavTab === NavTabs.ANALYZE ? "block" : "none",
        }}
      />
      {loading && currentNavTab === NavTabs.ANALYZE && (
        <LoadingSpinner
          id="loading-spinner"
          src="https://cutewallpaper.org/21/loading-gif-transparent-background/Update-throbber-icon-in-Seven-theme-2775725-Drupalorg.gif"
        />
      )}
    </>
  );
};
