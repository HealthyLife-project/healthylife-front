import styled from "styled-components";

export const CreateChatStyle = styled.div`
  &.main-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-box {
    width: 100%;
    height: 100%;
    margin-top: 100px;
    max-width: 400px;
    text-align: center;

    .chat-title {
      padding-bottom: 10px;
    }
  }

  h1 {
    font-size: 24px;
    margin-bottom: 24px;
    color: #333;
  }

  .chat-input {
    margin-bottom: 16px;
    height: 44px;
    font-size: 16px;
  }

  .chat-button {
    width: 100%;
    height: 44px;
    font-size: 16px;
    font-weight: 500;
  }
`;
