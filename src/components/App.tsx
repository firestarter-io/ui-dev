import React, { useState } from 'react';
import { bounds } from 'leaflet';
import Map from './Map';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

export default function App() {
	const [map, setMap] = useState();

	return (
		<Wrapper>
			<GlobalStyles />
			<Map setMap={setMap} map={map} />
		</Wrapper>
	);
}
