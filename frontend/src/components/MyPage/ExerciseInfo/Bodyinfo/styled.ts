// 스타일
import styled from "styled-components";

export const BodyInfoStyle = styled.div`
  width: 100%;

  h1 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 24px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 15px;

    div {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      font-size: 16px;
      color: #444;

      input {
        margin-top: 5px;
        padding: 10px;
        font-size: 13px;
        width: 40%;
      }
    }
    .btn-group {
      display: flex;
      flex-direction: row;
      gap: 10px;
      justify-content: center;

      .save-btn {
        width: 100px;
        background-color: #6ca6cd;
        color: white;
        height: 35px;
        border-radius: 8px;
      }

      .ant-upload {
        display: flex;
        justify-content: center;
      }

      .ant-btn {
        background-color: #6ca6cd;
        color: white;
        height: 35px;
        border-radius: 8px;
      }
    }
  }
`;
