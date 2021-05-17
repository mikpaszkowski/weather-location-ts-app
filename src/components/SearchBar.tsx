import * as React from "react";
import styled, { css, keyframes } from "styled-components";
import { BiSearch } from "react-icons/bi";

interface InputProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}

interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  searchResult?: boolean | null;
}

interface Props extends FormProps, InputProps {}

const slideUp = keyframes`
    from{
        transform: translateY(15rem);
        opacity: 0;
    }
    to{
        transform: translateY(10rem);
        opacity: 1;
    }
`;

const stretch = keyframes`
    from{
        transform: scaleX(.3)
    }
    to{
        transform: scaleX(1)
    }
`;

const fadeIn = keyframes`
    from{
        opacity: 0
    }
    to{
        opacity: 1
    }
`;
//  transform: ${(props: FormProps) =>
//     props.searchResult ? `translateY(-5rem)` : `translateY(5rem)`};

const SearchBarWrapper = styled.form<FormProps>`
  margin: 0 auto;
  width: 100%;
  position: relative;
  border-radius: 5rem;
  transition: 0.4s 0.4s;
  transform: scaleX(0.3);
  animation: ${css`
    ${slideUp} 3s cubic-bezier(0.2, 0.72, 0.01, 0.87) 3.5s both
  `};
  will-change: initial;
`;

const SearchBarInput = styled.input<InputProps>`
  width: 100%;
  padding: 1.5rem 3rem 1.5rem 8rem;
  font-size: 3rem;
  font-weight: 300;
  color: #909090;
  border-radius: 5rem;
  border: none;
  outline: none;
  animation-name: ${stretch};
  animation-delay: 2s;
  animation-timing-function: cubic-bezier(0.2, 0.72, 0.01, 0.87);
  animation-fill-mode: both;
  animation-duration: 2s;
  will-change: initial;

  &::placeholder {
    color: #c5c5c5;
    animation-name: ${fadeIn};
    animation-delay: 5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
    animation-duration: 2s;
    will-change: initial;
  }

  &:hover {
  }
`;

const SearchIcon = styled(BiSearch)`
  position: absolute;
  display: block;
  top: 1.4rem;
  left: 2.4rem;
  font-size: 3.5rem;
  color: #c5c5c5;
`;

export const SearchBar = ({
  onSubmit,
  onChange,
  name,
  value,
  placeholder,
  searchResult,
}: Props) => {
  return (
    <SearchBarWrapper onSubmit={onSubmit} searchResult={searchResult}>
      <SearchBarInput
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
      />
      <SearchIcon />
    </SearchBarWrapper>
  );
};
