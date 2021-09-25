import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const loaderAnimation = keyframes`
  0%{
    box-shadow: 0 2.5em 0 -1.3em;
  }
  80%{
    box-shadow: 0 2.5em 0 -1.3em;
  }
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
`;

const LoaderWrapper = styled.div`
	color: #ffffff;
	font-size: 10px;
	margin: 80px auto;
	position: relative;
	text-indent: -9999em;
	transform: translateZ(0);
	animation-delay: -0.1s;

	&,
	&:before,
	&:after {
		border-radius: 50%;
		width: 2.5em;
		height: 2.5em;
		animation-fill-mode: both;
		animation: ${loaderAnimation} 1.8s infinite ease-in-out;
	}
	&:before,
	&:after {
		content: '';
		position: absolute;
		top: 0;
	}

	&:before {
		left: -3.5em;
		animation-delay: -0.32s;
	}
	&:after {
		left: 3.5em;
	}
`;

export const Loader = () => {
	return <LoaderWrapper></LoaderWrapper>;
};
