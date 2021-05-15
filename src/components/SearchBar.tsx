import * as React from "react";
import styled, { css, keyframes } from "styled-components";

interface InputProps {
  placeholder: string;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}

const slideUp = keyframes`
    from{
        transform: translateY(0);
        opacity: 0;
    }
    to{
        transform: translateY(-2rem);
        opacity: 1;
    }
`;

const stretch = keyframes`
    from{
        transform: scaleX(2%)
    }
    to{
        transform: scaleX(100%)
    }
`;

const SearchBarWrapper = styled.form`
  margin: 0 auto;
  width: 70rem;
  border-radius: 5rem;
  transition: 0.4s 0.4s;
  transform: translateY(-3rem);
  animation-name: ${slideUp};
  animation-delay: 3.5s;
  animation-timing-function: cubic-bezier(0.2, 0.72, 0.01, 0.87);
  animation-fill-mode: both;
  animation-duration: 1s;
  will-change: initial;
`;

const SearchBarInput = styled.input`
  width: 100%;
  padding: 1.5rem 3rem;
  font-size: 3rem;
  font-weight: 300;
  color: #909090;
  border-radius: 5rem;
  border: none;
  outline: none;
  animation: ${css`
    ${stretch} 2s cubic-bezier(.2,.72,.01,.87) 2s both
  `};

  &::placeholder {
    color: #c5c5c5;
  }

  &:hover {
  }
`;

const SearchBar = ({ onSubmit, onChange, ...props }: InputProps) => {
  return (
    <SearchBarWrapper onSubmit={onSubmit}>
      <SearchBarInput onChange={onChange} {...props} />
    </SearchBarWrapper>
  );
};

export default SearchBar;
