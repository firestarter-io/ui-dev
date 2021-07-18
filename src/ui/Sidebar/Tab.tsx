/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React, { MouseEventHandler } from "react";

export interface TabProps {
  id?: string;
  header?: string;
  onClose?: MouseEventHandler<HTMLDivElement>;
  active?: boolean;
  children?: React.ReactNode;
  anchor?: string;
  disabled?: boolean;
  icon: React.ElementType | React.ReactNode | HTMLElement;
  quickClick?: Function;
}

const closeIconSelector = (props) => {
  switch (typeof props.closeIcon) {
    case "string":
      return <i className={props.closeIcon} />;
    case "object":
      return props.closeIcon;
    default:
      return props.position === "right" ? (
        <i className="fa fa-caret-right" />
      ) : (
        <i className="fa fa-caret-left" />
      );
  }
};

const Tab: React.FC<TabProps> = (props: TabProps) => {
  const active = props.active ? " active" : "";
  const closeIcon = closeIconSelector(props);

  return (
    <div id={props.id} className={`sidebar-pane${active}`}>
      <h1 className="sidebar-header">
        {props.header}
        <div className="sidebar-close" role="btn" onClick={props.onClose}>
          {closeIcon}
        </div>
      </h1>
      {props.children}
    </div>
  );
};

export default Tab;
