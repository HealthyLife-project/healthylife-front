import styled from "styled-components";

export const CreateChatStyle = styled.div`
  &.main-wrap {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    //background-color: #f9fafb;
  }

  .chat-box {
    width: 100%;
    max-width: 800px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #ffffff;
    text-align: center;
  }

  h1 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #222;
  }

  .chat-title {
    font-size: 14px;
    margin-bottom: 6px;
    color: #666;
  }

  .chat-box > div:nth-of-type(2),
  .chat-box > div:nth-of-type(3) {
    font-size: 13px;
    color: #999;
    margin-bottom: 4px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .chat-input {
      width: 80%;
      margin-top: 20px;
      margin-bottom: 16px;
      height: 44px;
      font-size: 15px;
      padding: 0 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }

    .chat-button {
      width: 130px;
      height: 44px;
      font-size: 15px;
      font-weight: 500;
      background-color: #6ca6cd;
      border-color: #6ca6cd;
      border-radius: 8px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #5c98c3;
        border-color: #5c98c3;
      }
    }
  }
`;
