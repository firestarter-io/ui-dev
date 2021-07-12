import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Sidebar from './Sidebar';

const Wrapper = styled.div`
	position: absolute;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-gap: 10px;
	margin: 10px;
	z-index: 10000;
	pointer-events: none;

	& > * {
		pointer-events: auto;
	}
`;

const UIOverlay = (props) => {
	//  const useActiveArea = useSelector(state => state.useActiveArea)
	//  const openTab = useSelector(state => state.sidebarTab)
	//  const showActiveArea = (openTab === 'externalConrols' || openTab === 'ui') ? true : false;
	//  const style = showActiveArea
	//     ? {}
	//     : {border: 'none'}

	return (
		<Wrapper>
			<Sidebar map={undefined} />
			{/* {useActiveArea && <ActiveAreaExternal className="external" style={style} map={props.map} />} */}
		</Wrapper>
	);
};

export default UIOverlay;
