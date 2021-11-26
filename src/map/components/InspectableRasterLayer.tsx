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
import ReactDOM from "react-dom";
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
  const [rgba, setRgba] = useState({ R: 0, G: 0, B: 0, A: 0 });
  const canvasRef = useRef<HTMLCanvasElement>();

  const map = useMap();
  const { height, width } = map.getContainer().getBoundingClientRect();

  const currentNavTab = useSelector(
    (state: ApplicationState) => state.view.currentNavTab
  );

  const layerImageRequest = new EsriImageRequest(rest);

  /**
   * Function to fetch the esri image and draw it to the canvas
   */
  const fetchAndApplyImage = React.useCallback(() => {
    if (canvasRef.current && currentNavTab === NavTabs.ANALYZE) {
      console.log("calling fetchAndApplyImage");

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
    }
  }, [map, canvasRef.current, layerImageRequest]);

  /**
   * Function to get the latlng of the mouse position, cross reference it against the pixel
   * at that position on the canvas, get the pixel value at that pixel, and then look up
   * that pixel in the layer's legend JSON
   */
  const getPixel = React.useCallback(
    (e: L.LeafletMouseEvent) => {
      console.log(layerImageRequest._legendJSON);
      if (!loading && canvasRef.current && currentNavTab === NavTabs.ANALYZE) {
        const { x, y } = map.latLngToContainerPoint(e.latlng);
        const ctx = canvasRef.current.getContext("2d");
        const pixelData = ctx.getImageData(x, y, 1, 1);
        const [R, G, B, A] = pixelData.data;
        const rgbvalue = { R, G, B, A };
        setRgba(rgbvalue);

        const value = layerImageRequest._legendJSON.find((symbol) =>
          compareObjectWithTolerance(symbol.rgbvalue, rgbvalue, 1)
        );
      }
    },
    [map, canvasRef.current, currentNavTab, layerImageRequest._legendJSON]
  );

  useEffect(() => {
    console.log("mounting component and calling new EsriImageRequest");

    const createImageRequest = async () => {
      await layerImageRequest.fetchJson();
      await layerImageRequest.generateLegend();

      /**
       * Call function to draw image to canvas on mount and on the following map events:
       */
      map.on("moveend", fetchAndApplyImage);

      /**
       * When mouse moves on map, run the getpixel function
       */
      map.on("mousemove", getPixel);
    };

    createImageRequest();

    // @ts-ignore
    window.layerImageRequest = layerImageRequest;
  }, []);

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
      {currentNavTab === NavTabs.ANALYZE &&
        ReactDOM.createPortal(
          <div>
            This is a portal item
            <br />
            {JSON.stringify(rgba)}
          </div>,
          document.getElementById("fuel-13-analysis-readout")
        )}
      {loading && currentNavTab === NavTabs.ANALYZE && (
        <LoadingSpinner
          id="loading-spinner"
          src="https://cutewallpaper.org/21/loading-gif-transparent-background/Update-throbber-icon-in-Seven-theme-2775725-Drupalorg.gif"
        />
      )}
    </>
  );
};
