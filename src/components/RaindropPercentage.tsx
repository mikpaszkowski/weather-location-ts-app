import * as React from 'react';
import styled from 'styled-components';
import { CustomIcon } from '../iconComponents/CustomIcon';
import { device } from '../styles/responsive';

const RaindropPercentageWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-right: 2rem;

	& > img {
		width: 4rem;
	}
`;

const Percipitation = styled.span`
	font-size: 2.2rem;
	padding: 1rem 0 1rem 0;

	@media ${device.tablet} {
		font-size: 1.8rem;
	}

	@media ${device.mobileLarge} {
		font-size: 1.5rem;
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
