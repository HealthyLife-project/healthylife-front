import styled from "styled-components";
import { Button } from "antd";

export const HashtagFormStyled = styled.div`
  .registerHashtags {
    background-color: #d2e4f8;
  }
`;

interface StyledHashtagButtonProps {
  toggled: boolean;
}

export const StyledHashtagButton = styled(Button)<StyledHashtagButtonProps>`
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: ${(tags) => (tags.toggled ? "#E6E6E6" : "#F7F6F4")};
  color: black;

  /* You can add other styles for the button here as well */
`;
