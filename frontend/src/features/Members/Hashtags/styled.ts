import styled from "styled-components";

export const HashtagFormStyled = styled.div`
  &.main-wrap {
    .registerHashtags {
      background-color: #d2e4f8;
    }

    .hashtags-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
    }

    .submit-container {
      display: flex;
      margin-top: 20px;
      justify-content: center;
    }
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
  background-color: ${(props) => (props.$toggled ? "#D2E4F8" : "#E6E6E6")};
  color: black;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 8px;
`;
