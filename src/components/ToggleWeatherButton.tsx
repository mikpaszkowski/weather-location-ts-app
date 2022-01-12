import * as React from 'react';
import styled from 'styled-components';
import { IWeatherDisplaySetting } from '../store/weatherDisplay/weatherDisplaySettingSlice';

const ToggleButton = styled.button`
	display: flex;
	flex-direction: row;
	width: 100%;
	align-self: flex-start;
	bottom: 1rem;
	left: 4rem;
	z-index: 2;
	background-color: transparent;
	border: 1px solid #ffffff;
	border-radius: 2rem;
	letter-spacing: 0.1rem;
	cursor: pointer;
`;

const Hourly = styled.div`
	z-index: 1;
	color: white;
	font-size: 2rem;
	height: 100%;
	width: 50%;
	border-radius: 2rem;
	padding: 1rem 4rem;
	background-color: ${(props: IWeatherDisplaySetting) =>
		props.displaySetting === 'hourly' ? '#ffffff60' : 'transparent'};
	transition: background-color 0.2s ease-in-out;
`;

const Daily = styled(Hourly)`
	background-color: ${(props: IWeatherDisplaySetting) =>
		props.displaySetting === 'daily' ? '#ffffff60' : 'transparent'};
`;

interface ToggleButtonProps {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ToggleWeatherButton = (
	props: IWeatherDisplaySetting & ToggleButtonProps
) => {
	return (
		<ToggleButton onClick={props.onClick}>
			<Hourly displaySetting={props.displaySetting}>Hourly</Hourly>
			<Daily displaySetting={props.displaySetting}>Daily</Daily>
		</ToggleButton>
	);
};
