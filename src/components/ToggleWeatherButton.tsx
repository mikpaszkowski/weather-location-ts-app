import * as React from 'react';
import styled from 'styled-components';
import { IWeatherDisplaySetting } from '../store/weatherDisplay/weatherDisplaySettingSlice';

const ToggleButton = styled.button`
	position: absolute;
	display: flex;
	flex-direction: row;
	bottom: 1rem;
	left: 4rem;
	z-index: 2;
	background-color: transparent;
	border: none;
	border-top: 1px solid #ffffff;
	cursor: pointer;
`;

const Hourly = styled.div`
	z-index: 1;
	color: white;
	font-size: 2rem;
	height: 100%;
	padding: 1rem 1rem;
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
