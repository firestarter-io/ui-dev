/*
 * Firestarter.io
 *
 * Copyright (C) 2021 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import * as L from "leaflet";
import { latLngBounds, bounds } from "leaflet";
import { Image, loadImage } from "canvas";

/**
 * Token getter function for ESRI authenticated services
 * @param client_id | Esri client ID
 * @param client_secret | Esri Client Secret
 * @param expiration | Token expiration time
 */
export async function getEsriToken(
  client_id: string,
  client_secret: string,
  expiration = 3.6e6
): Promise<string> {
  const authservice = "https://www.arcgis.com/sharing/rest/oauth2/token";
  const url = `${authservice}?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials&expiration=${expiration}`;

  let token;

  await fetch(url, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((res) => {
      token = res.access_token;
    })
    .catch((error) => {
      console.error(error);
    });

  return token;
}

/**
 * Type definition for esri related functions and utils
 */

export interface ImageRequestOptions {
  url: string;
  exportType?: "export";
  token?: string;
  format?: string;
  f?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderingRule?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mosaicRule?: any;
  sr?: string;
  sublayer?: string;
  dpi?: string;
}

interface EsriRequestParams {
  bbox: string;
  size: string;
  format: string;
  bboxSR: string;
  imageSR: string;
  f: string;
  token?: string;
  renderingRule?: string;
  mosaicRule?: string;
  layers?: string;
}

/**
 * Util class for creating esri image requests
 */
export class EsriImageRequest {
  _options: Omit<ImageRequestOptions, "url">;
  _url: string;
  // Allow any because legend JSON files are not easy to type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _layerJSON: any;

  constructor(options: ImageRequestOptions) {
    const { url, ...rest } = options;
    this._url = url;
    this._options = rest;
  }

  /**
   * fetch layer JSON and store in instance
   */
  async _fetchJson(): Promise<void> {
    const response = await fetch(`${this._url}?f=json`);
    const esriJSON = await response.json();
    this._layerJSON = esriJSON;
  }

  /**
   * request image based on bounds
   * @param llBounds | LatLngBounds of desired image
   */
  async fetchImage(
    latLngBounds: L.LatLngBounds,
    scale: number
  ): Promise<Image> {
    const exportType = this._options?.exportType || "exportImage";
    const params = this._buildExportParams(latLngBounds, scale);
    const fullUrl = `${this._url}/${exportType}${L.Util.getParamString(
      params
    )}`;
    return loadImage(fullUrl);
  }

  /**
   * Calculates size of desired image
   * @param llBounds | LatLngBounds of desired image
   */
  static _calculateImageSize(llBounds: L.LatLngBounds, scale: number): string {
    const mapBounds = latLngBounds(
      llBounds.getSouthWest(),
      llBounds.getNorthEast()
    );

    const se = mapBounds.getSouthEast();
    const nw = mapBounds.getNorthWest();

    const topLeft = L.CRS.EPSG3857.latLngToPoint(nw, scale);
    const bottomRight = L.CRS.EPSG3857.latLngToPoint(se, scale);

    const pixelBounds = bounds(topLeft, bottomRight);

    const size = pixelBounds.getSize().round();

    return `${size.x},${size.y}`;
  }

  /**
   * Calculates the bounding box of the desired image
   * @param llBounds | LatLngBounds of desired image
   * Adjusted from esri-leaflet/src/Layers/RasterLayer.js to not need an L.Map instance
   */
  static _calculateBbox(llBounds: L.LatLngBounds): string {
    const mapBounds = latLngBounds(
      llBounds.getSouthWest(),
      llBounds.getNorthEast()
    );

    const neProjected = L.CRS.EPSG3857.project(mapBounds.getNorthEast());
    const swProjected = L.CRS.EPSG3857.project(mapBounds.getSouthWest());

    // this ensures ne/sw are switched in polar maps where north/top bottom/south is inverted
    const boundsProjected = bounds(neProjected, swProjected);

    return [
      boundsProjected.getBottomLeft().x,
      boundsProjected.getBottomLeft().y,
      boundsProjected.getTopRight().x,
      boundsProjected.getTopRight().y,
    ].join(",");
  }

  /**
   * Function to build export parameters for esri request of desired image
   * @param llBounds | Map bounds of desired image
   * @param options | Options
   */
  _buildExportParams(
    llBounds: L.LatLngBounds,
    scale: number
  ): EsriRequestParams {
    const sr = parseInt(L.CRS.EPSG3857.code.split(":")[1], 10);
    const params: EsriRequestParams = {
      bbox: EsriImageRequest._calculateBbox(llBounds),
      size: EsriImageRequest._calculateImageSize(llBounds, scale),
      format: this._options?.format || "png",
      bboxSR: sr.toString(),
      imageSR: sr.toString(),
      f: this._options?.f || "image",
    };

    if (this._options?.token) {
      params.token = this._options.token;
    }

    if (this._options?.renderingRule) {
      params.renderingRule = JSON.stringify(this._options.renderingRule);
    }

    if (this._options?.mosaicRule) {
      params.mosaicRule = JSON.stringify(this._options.mosaicRule);
    }

    if (this._options?.sr) {
      params.bboxSR = this._options.sr;
      params.imageSR = this._options.sr;
    }

    if (this._options?.sublayer) {
      params.layers = `show:${this._options.sublayer}`;
    }

    return params;
  }

  // Allow any because legend JSON files are not easy to type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async generateLegend(): Promise<any> {
    const legendUrl = `${this._url}/legend?f=pjson`;
    let layerJSON;
    let rgbValues;

    const canvas = document.createElement("canvas");
    canvas.height = 20;
    canvas.width = 20;
    const ctx = canvas.getContext("2d");

    // Get JSON of layer / sublayer's legend
    await fetch(legendUrl)
      .then((res) => res.json())
      .then((data) => {
        const layerId = this._options.sublayer || "0";
        layerJSON = data.layers.find((layer) => layer.layerId === layerId);
      });

    // Transform legend array images into rgbValues
    await Promise.all(
      layerJSON.legend.map((symbol) =>
        loadImage(`data:image/png;base64,${symbol.imageData}`)
      )
    ).then((symbolImages) => {
      rgbValues = symbolImages.map((image: CanvasImageSource) => {
        ctx.drawImage(image, 0, 0);
        const [R, G, B, A] = ctx.getImageData(10, 10, 1, 1).data;
        console.log({ R, G, B, A });
        return { R, G, B, A };
      });
      return rgbValues;
    });

    const legend = await layerJSON.legend.map((symbol, ind) => ({
      ...symbol,
      rgbvalue: rgbValues[ind],
    }));

    return legend;
  }

  /**
   * Many methods adapted from L.esri.RasterLayer:
   * https://github.com/Esri/esri-leaflet/blob/5569b703ed9ab2aeb83d57cb55cd1bc940fea38f/src/Layers/RasterLayer.js
   */
}

/**
 * Function to compare whether two numbers are the same, returns true if the difference is less than or equal to the defined tolerance
 * @param value1 | First value
 * @param value2 | Second value
 * @param tolerance | Tolerance under which two numbers should be considered the same
 */
export function compareWithTolerance(
  value1: number,
  value2: number,
  tolerance: number
): boolean {
  return Math.abs(value1 - value2) <= Math.abs(tolerance);
}

/**
 * Compares two objects of the pattern [key]: number to see if their values match within a given tolerance
 * @param obj1 | First object to compare
 * @param obj2 | Second object to compare
 * @param tolerance | Tolerance for comparing values
 */
export function compareObjectWithTolerance(
  obj1: object,
  obj2: object,
  tolerance: number
): boolean {
  const sames = [];
  Object.keys(obj1).forEach((e) => {
    if (compareWithTolerance(obj1[e], obj2[e], tolerance)) {
      sames.push(true);
    } else {
      sames.push(false);
    }
  });
  return !sames.some((c) => !c);
}
