import styled from "styled-components";

export const FindIDPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;

  .findID-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
    text-align: center;
  }

  p {
    color: #666;
    text-align: center;
    margin-bottom: 20px;
  }

  .error-message {
    color: red;
    margin-top: 5px;
    font-size: 14px;
    white-space: pre-wrap;
    text-align: left;
  }

  .result-message {
    margin-top: 20px;
    text-align: center;
    color: #28a745;
  }

  .ant-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  button[type="submit"] {
    background-color: #d2e4f8;
    color: black;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    margin-top: 20px;
    width: auto;
    align-self: center;

    &:hover {
      background-color: #c0d9f3;
    }

    &:disabled {
      background-color: #f0f0f0;
      color: #999;
      cursor: not-allowed;
    }
  }

  .ant-divider {
    margin: 20px 0;
  }
`;
