import React, { MouseEventHandler } from 'react';

export interface TabProps {
	id?: string;
	header?: string;
	onClose?: MouseEventHandler<HTMLDivElement>;
	active?: Boolean;
	children?: React.ReactNode;
	anchor?: string;
	disabled?: boolean;
	icon: React.ElementType | React.ReactNode | HTMLElement;
}

const Tab: React.FC<TabProps> = (props: TabProps) => {
	const active = props.active ? ' active' : '';
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

const closeIconSelector = (props) => {
	switch (typeof props.closeIcon) {
		case 'string':
			return <i className={props.closeIcon} />;
		case 'object':
			return props.closeIcon;
		default:
			return props.position === 'right' ? (
				<i className="fa fa-caret-right" />
			) : (
				<i className="fa fa-caret-left" />
			);
	}
};

export default Tab;
