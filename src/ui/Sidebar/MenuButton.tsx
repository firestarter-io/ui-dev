/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

import React from "react";
import * as L from "leaflet";

export interface MenuButtonProps {
  id: string;
  icon: React.ElementType | React.ReactNode | HTMLElement | string;
  disabled?: boolean;
  selected?: string | boolean;
  onOpen: Function;
  onClose: Function;
  collapsed: boolean;
  header?: string;
  map: L.Map;
  quickClick?: Function;
}

const MenuButton: React.FC<MenuButtonProps> = (props: MenuButtonProps) => {
  const icon =
    props.icon === "string" ? (
      <i className={props.icon as string} />
    ) : (
      props.icon
    );
  const active =
    props.id === props.selected && !props.collapsed ? " active" : "";
  const disabled = props.disabled ? " disabled" : "";

  const onClick = (e, id) => {
    if (!props.disabled) {
      if (props.collapsed) {
        props.onOpen(e, id);
      } else if (props.selected === id) {
        props.onClose(e);
      } else {
        props.onOpen(e, id);
      }
    }
  };

  return (
    <li className={active + disabled} key={props.id}>
      <button
        className="sidebar-tab-button"
        role="tab"
        title={props.header}
        type="submit"
        onClick={(e) => {
          if (props.quickClick) {
            props.quickClick();
          } else {
            onClick(e, props.id);
          }
        }}
      >
        {" "}
        {icon}
      </button>
    </li>
  );
};

export default MenuButton;
