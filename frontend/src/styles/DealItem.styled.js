import styled from "styled-components";
import {Button} from "react-bootstrap";

export const DealItemLiStyle = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  border: 2px solid #A9A9A9;
  border-radius: 5px;
  list-style-type: none;
  margin: 0 auto 25px auto;
`;

export const DealItemImgTitleWrapStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
  height: 100%;
`;

export const DealItemTitleStyle = styled.h5`
  font-weight: 500;
  margin: 0 0 0 30px;
  width: 500px;
`;

export const DealItemCounterStyle = styled.div`
  display: flex;
`;

export const DealItemPriceDeleteBlockStyle = styled.div`
  display: flex;
  margin: 0 20px 0 0;
  // width: 200px;
`;

export const DealItemButtonStyle = styled(Button)`
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  margin: 0px 5px;
`;

export const DealItemCountNumStyle = styled.span`
  margin: 0 10px;
`;

export const DealItemPriceStyle = styled.span`
  margin: 0 20px 0 auto;
`;