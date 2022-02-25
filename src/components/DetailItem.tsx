import { CustomIcon } from "../iconComponents/CustomIcon";
import styled from "styled-components";

const DetailItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
  width: ${(props: DetailItemWrapperProps) => props.isWide ? "100%" : "auto"}
`;

const DetailText = styled.span`
    font-size: 2rem;
    margin-left: ${(props: DetailItemWrapperProps) => props.isWide ? '2.3rem' : "0"}
`;

type DetailItemPropsType = {
  iconName: string,
  text: string,
  small?: boolean
  fontSize?: string
  wide?: boolean
  label?: string
}

type DetailItemWrapperProps = {
  isWide?: boolean
}

export const DetailItem = ({iconName, text, small, fontSize, label, wide}: DetailItemPropsType) => {

  return(
    <DetailItemWrapper isWide={wide}>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <CustomIcon alt={iconName} src={iconName} width="6rem"/>
        <DetailText isWide={wide} style={fontSize ? {fontSize: fontSize} : (small ? {fontSize: "1.7rem"} : {})}>{text}</DetailText>
      </div>
      {
        (label) ? <DetailText style={fontSize ? {fontSize: fontSize} : (small ? {fontSize: "1.7rem"} : {})}>{label}</DetailText> : null
      }
    </DetailItemWrapper>
  )
}