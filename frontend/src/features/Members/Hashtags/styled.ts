import styled from "styled-components";
import { Button } from "antd";

export const HashtagFormStyled = styled.div`
  .registerHashtags {
    background-color: #d2e4f8;
  }
`;

interface StyledHashtagButtonProps {
  $toggled: boolean;
}

export const StyledHashtagButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "$toggled",
})<StyledHashtagButtonProps>`
  border: none;
  padding: 8px 16px;
  background-color: ${(props) => (props.$toggled ? "#E6E6E6" : "#F7F6F4")};
  color: black;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 8px;
`;
