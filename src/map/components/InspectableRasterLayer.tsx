/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React, { useRef, useState } from "react";
import { useMap } from "react-leaflet";
import styled from "styled-components";
import { EsriImageRequest, ImageRequestOptions } from "utils/esri";

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
  const map = useMap();

  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>();

  const { height, width } = map.getContainer().getBoundingClientRect();

  const layerImageRequest = new EsriImageRequest(rest);

  /**
   * Function to fetch the esri image and draw it to the canvas
   */
  const fetchAndApplyImage = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

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
  };

  /**
   * Call function to draw image to canvas on the following map events:
   */
  map.on("load moveend zoomend resize", fetchAndApplyImage);

  return (
    <>
      {children}
      <AnalysisCanvas height={height} width={width} ref={canvasRef} />
      {loading && (
        <LoadingSpinner
          id="loading-spinner"
          src="https://cutewallpaper.org/21/loading-gif-transparent-background/Update-throbber-icon-in-Seven-theme-2775725-Drupalorg.gif"
        />
      )}
    </>
  );
};
