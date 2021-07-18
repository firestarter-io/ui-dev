/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React, { MouseEvent } from "react";
import * as L from "leaflet";
import { TabProps } from "./Tab";
import MenuButton, { MenuButtonProps } from "./MenuButton";
import "./sidebar.scss";

const breakpoints = [
  parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--breakpoint-s"
    ),
    10
  ),
  parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--breakpoint-m"
    ),
    10
  ),
  parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--breakpoint-l"
    ),
    10
  ),
];

const widths = [
  parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--leaflet-sidetabs-width-s"
    ),
    10
  ),
  parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--leaflet-sidetabs-width-m"
    ),
    10
  ),
  parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--leaflet-sidetabs-width-l"
    ),
    10
  ),
];

interface Props {
  id?: string;
  rehomeControls?: boolean;
  position?: string;
  onClose?: Function;
  onOpen?: Function;
  panMapOnChange?: boolean;
  map?: L.Map;
  collapsed?: boolean;
  closeIcon?: React.ElementType | React.ReactNode | HTMLElement;
  selected?: string | false;
  children: React.ReactElement<TabProps>[];
}

class Sidebar extends React.Component<Props> {
  rootElement;

  componentDidMount(): void {
    const { rehomeControls } = this.props;

    if (rehomeControls) {
      const { position } = this.props;
      const selector = `.leaflet-${position}`;
      const controls = document.querySelectorAll(selector);
      const topControl = document.querySelector(`.leaflet-top${selector}`);
      const bottomControl = document.querySelector(
        `.leaflet-bottom${selector}`
      );

      topControl.classList.add(`rehomed-top-${position}`);
      bottomControl.classList.add(`rehomed-bottom-${position}`);

      // Exception: Attribution control should not ever be rehomed (in my opinion):
      const attributionControl = document.querySelector(
        `${selector} .leaflet-control-attribution`
      );
      if (attributionControl) {
        const backupOriginalHome = document.createElement("div");
        const leafletControlContainer = document.querySelector(
          ".leaflet-control-container"
        );
        backupOriginalHome.classList.add(`leaflet-${position}`);
        backupOriginalHome.classList.add("leaflet-bottom");
        backupOriginalHome.appendChild(attributionControl);
        leafletControlContainer.appendChild(backupOriginalHome);
      }

      controls.forEach((control) => this.rootElement.appendChild(control));
    }
  }

  onClose = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.onClose) {
      this.props.onClose(e);
    }
    if (this.props.panMapOnChange) {
      if (this.props.map) {
        this.props.map.panBy([this.getOffset() / 2, 0], { duration: 0.5 });
      } else {
        console.error(
          `react-leaflet-sidetabs: 'panMapOnChange' prop requires that 'map' prop is provided, 'map' prop not provided`
        );
      }
    }
  };

  onOpen = (e: MouseEvent, tabid: string): void => {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onOpen) {
      this.props.onOpen(tabid);
    }
    if (this.props.panMapOnChange && this.props.collapsed) {
      if (this.props.map) {
        this.props.map.panBy([-this.getOffset() / 2, 0], { duration: 0.5 });
      } else {
        console.error(
          `react-leaflet-sidetabs: 'panMapOnChange' prop requires that 'map' prop is provided, 'map' prop not provided`
        );
      }
    }
  };

  getOffset = (): number => {
    const windowSize = window.innerWidth;
    let offset;
    for (let i = 0; i < breakpoints.length - 1; i++) {
      if (windowSize > breakpoints[i] && windowSize <= breakpoints[i + 1]) {
        offset = widths[i] / 2;
      }
    }
    if (windowSize > breakpoints[breakpoints.length - 1]) {
      offset = widths[widths.length - 1] / 2;
    }
    return this.props.position === "left" ? offset : -offset;
  };

  renderPanes(children: React.ReactElement<TabProps>[]): JSX.Element[] {
    return React.Children.map(children, (p) =>
      React.cloneElement(p, {
        onClose: this.onClose.bind(this),
        icon: this.props.closeIcon,
        active: p.props.id === this.props.selected,
      })
    );
  }

  render(): JSX.Element {
    const position = ` sidebar-${this.props.position || "left"}`;
    const collapsed = this.props.collapsed ? " collapsed" : "";
    const tabs = React.Children.toArray(this.props.children);
    const bottomtabs = tabs.filter(
      (t: React.ReactElement<TabProps>) => t.props.anchor === "bottom"
    );
    const toptabs = tabs.filter(
      (t: React.ReactElement<TabProps>) => t.props.anchor !== "bottom"
    );

    return (
      <div
        id={this.props.id || "leaflet-sidebar"}
        className={`sidebar leaflet-touch${position}${collapsed}`}
        ref={(el) => {
          this.rootElement = el;
        }}
      >
        <div className="sidebar-tabs">
          <ul role="tablist">
            {toptabs.map((t: React.ReactElement<MenuButtonProps>) => (
              <MenuButton
                key={t.props.id}
                id={t.props.id}
                icon={t.props.icon}
                disabled={t.props.disabled}
                selected={this.props.selected}
                collapsed={this.props.collapsed}
                onClose={this.onClose}
                onOpen={this.onOpen}
                map={this.props.map || null}
                quickClick={t.props.quickClick}
              />
            ))}
          </ul>
          <ul role="tablist">
            {bottomtabs.map((t: React.ReactElement<MenuButtonProps>) => (
              <MenuButton
                key={t.props.id}
                id={t.props.id}
                icon={t.props.icon}
                disabled={t.props.disabled}
                selected={this.props.selected}
                collapsed={this.props.collapsed}
                onClose={this.onClose}
                onOpen={this.onOpen}
                map={this.props.map || null}
                quickClick={t.props.quickClick}
              />
            ))}
          </ul>
        </div>
        <div className="sidebar-content">
          {this.renderPanes(this.props.children)}
        </div>
      </div>
    );
  }
}

export default Sidebar;
