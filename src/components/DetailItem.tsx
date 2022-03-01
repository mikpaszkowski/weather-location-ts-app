import { CustomIcon } from "../iconComponents/CustomIcon";
import styled from "styled-components";
import { device } from "../styles/responsive";

const DetailItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1em;
  margin: 0;
  width: ${(props: DetailItemWrapperProps) => props.isWide ? "100%" : "auto"}
`;

const DetailText = styled.span`
  margin-left: ${(props: DetailItemWrapperProps) => props.isWide ? "2.7rem" : "0"};
  font-size: ${({ fontSize }: DetailItemWrapperProps) => fontSize ? `${fontSize}em` : "2.5em"};

  @media ${device.tablet} {
    font-size: ${({ fontSize }: DetailItemWrapperProps) => fontSize ? `${0.8 * fontSize}em` : "2em"};
  };

  @media ${device.tabletSmall} {
    margin-left: 0;
  };


  @media ${device.mobileLarge} {
    font-size: ${({ fontSize }: DetailItemWrapperProps) => fontSize ? `${0.7 * fontSize}em` : "1.7em"};
  }
`;

const ItemIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1em;

  @media ${device.mobileLarge} {
    & > img {
      width: 5rem;
    }
  }
`;

type DetailItemPropsType = {
  iconName: string,
  text: string,
  fontSize?: number
  wide?: boolean
  label?: string
  iconSize?: string
  noMargin?: boolean
}

type DetailItemWrapperProps = {
  isWide?: boolean;
  fontSize?: number;
  noMargin?: boolean;
}

export const DetailItem = ({ iconName, text, label, wide, iconSize, noMargin }: DetailItemPropsType) => {

  return (
    <DetailItemWrapper noMargin={noMargin} isWide={wide}>
      <ItemIconWrapper>
        <CustomIcon alt={iconName} src={iconName} width={iconSize} />
        <DetailText isWide={wide}>{text}</DetailText>
      </ItemIconWrapper>
      {
        (label) ? <DetailText>{label}</DetailText> : null
      }
    </DetailItemWrapper>
  );
};