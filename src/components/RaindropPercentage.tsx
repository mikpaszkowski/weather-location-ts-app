import * as React from 'react';
import styled from 'styled-components';
import { CustomIcon } from '../iconComponents/CustomIcon';
import { device } from '../styles/responsive';

const RaindropPercentageWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Percipitation = styled.span`
	font-size: 2.5rem;
	padding: 1rem 0 1rem 0;

	@media ${device.tablet} {
		font-size: 2rem;
	}
`;

export type RaindropDataType = {
	width: string;
	percipitation: number;
};

export const RaindropPercentage = ({
	width,
	percipitation,
}: RaindropDataType) => {
	return (
		<RaindropPercentageWrapper>
			<CustomIcon alt="weatherIcon" src="raindrop" width={width} />
			<Percipitation>{`${percipitation}%`}</Percipitation>
		</RaindropPercentageWrapper>
	);
};
