import { CustomIcon } from "../iconComponents/CustomIcon";
import styled from "styled-components";

const DetailItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
`;

const DetailText = styled.span`
    font-size: 2rem
`;

type DetailItemPropsType = {
  iconName: string,
  text: string,
  small?: boolean
}

export const DetailItem = ({iconName, text, small}: DetailItemPropsType) => {

  return(
    <DetailItemWrapper>
      <CustomIcon alt={iconName} src={iconName} width="6rem"/>
      <DetailText style={small ? {fontSize: "1.7rem"} : {}}>{text}</DetailText>
    </DetailItemWrapper>
  )
}