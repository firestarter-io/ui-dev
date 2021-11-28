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
import { EsriImageRequest, ImageRequestOptions, LegendEntry } from "utils/esri";
import { compareObjectWithTolerance, padWithZeroes } from "utils/math";

export enum AnalysisSectionIds {
  FUEL13 = "fuel-13-analysis-readout",
}

interface Props extends ImageRequestOptions {
  /**
   * Display name of layer to show in the analysis side tab
   */
  name: string;
  /**
   * Id of DOM node to attach results to
   */
  id: AnalysisSectionIds;
  /**
   * Children of layer, if any
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: React.ReactElement<any, any>;
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
  const { children, name, id, ...rest } = props;

  const [loading, setLoading] = useState(false);
  const [rgba, setRgba] = useState({ R: 0, G: 0, B: 0, A: 0 });
  const [value, setValue] = useState<LegendEntry>();

  const canvasRef = useRef<HTMLCanvasElement>();

  const map = useMap();
  const { height, width } = map.getContainer().getBoundingClientRect();

  const currentNavTab = useSelector(
    (state: ApplicationState) => state.view.currentNavTab
  );
  const analyzeModeActive = currentNavTab === NavTabs.ANALYZE;

  const layerImageRequest = new EsriImageRequest(rest);

  /**
   * Function to fetch the esri image and draw it to the canvas
   */
  const fetchAndApplyImage = React.useCallback(() => {
    if (canvasRef.current && analyzeModeActive) {
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
      if (!loading && canvasRef.current && analyzeModeActive) {
        const { x, y } = map.latLngToContainerPoint(e.latlng);
        const ctx = canvasRef.current.getContext("2d");
        const pixelData = ctx.getImageData(x, y, 1, 1);
        const [R, G, B, A] = pixelData.data;
        const rgbvalue = { R, G, B, A };
        setRgba(rgbvalue);

        const value = layerImageRequest._legendJSON.find((symbol) =>
          compareObjectWithTolerance(symbol.rgbvalue, rgbvalue, 10)
        );
        setValue(value);
      }
    },
    [map, canvasRef.current, analyzeModeActive, layerImageRequest._legendJSON]
  );

  useEffect(() => {
    const createImageRequest = async () => {
      /**
       * Fetch the JSON and the legend of the layer ahead of time, and once ready,
       * fetch the image and apply it to the canvas
       */
      await layerImageRequest.fetchJson();
      await layerImageRequest.generateLegend();
      fetchAndApplyImage();

      /**
       * Call function to draw image to canvas on mount and on the following map events:
       */
      map.on("moveend", fetchAndApplyImage);

      /**
       * When mouse moves on map, run the getpixel function
       */
      map.on("mousemove", getPixel);
    };

    /**
     * Only create the image request and add the handlers if we are in analyze mode
     */
    if (analyzeModeActive) {
      createImageRequest();
    }
  }, [analyzeModeActive]);

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
            {name}
            <br />
            <div
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: `rgba(${rgba.R}, ${rgba.G}, ${rgba.B}, ${rgba.A})`,
              }}
            />
            <code>
              R: {padWithZeroes(rgba.R, 3)}, G: {padWithZeroes(rgba.G, 3)}, B:
              {padWithZeroes(rgba.B, 3)}, A: {padWithZeroes(rgba.A, 3)}
            </code>
            <br />
            <code>Label: {value?.label ?? "Unknown"}</code>
          </div>,
          document.getElementById(id)
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
