// 스타일
import styled from "styled-components";

export const BodyInfoStyle = styled.div`
  &.main-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      text-align: center;
      margin-bottom: 10px;
      font-size: 26px;
      color: #333;
    }

    form {
      display: flex;
      flex-direction: column;
      width: 100%;

      gap: 15px;

      .inbody-input-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        font-size: 16px;
        color: #444;
        gap: 20px;
        padding: 0px 15px;

        .inbody-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;

          .inbody-title {
            display: flex;
            align-items: center;
          }

          .inbody-input {
            padding: 10px;
            font-size: 13px;
            width: 70%;
            border: none;
            border-bottom: 1px solid #444;
            border-radius: 0px;
          }
        }
      }
      .btn-group {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 10px;

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
  }
`;
