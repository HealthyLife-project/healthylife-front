import styled from "styled-components";

export const SignupPageStyled = styled.div`
  .signup-page-container {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 1280px;
    background-color: #f7f6f4;

    h1 {
      text-align: center;
      margin-bottom: 10px;
      position: relative;
      padding-bottom: 10px;
    }

    h1::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      width: 80%;
      height: 2px;
      background-color: #333;
    }

    h1::before {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 4px;
      transform: translateX(-50%);
      width: 80%;
      height: 2px;
      background-color: #333;
    }

    label {
      margin-top: 10px;
      margin-bottom: 0;
      display: block;
      font-weight: bold;
      text-align: left;
    }

    input[type="text"],
    input[type="password"],
    input[type="email"],
    input[type="number"],
    select {
      width: calc(100% - 10px);
      padding: 8px;
      margin-top: 0;
      border: 1px solid #ddd;
      border-radius: 3px;
      box-sizing: border-box;
    }

    .input-with-button-container {
      display: flex;
      align-items: center;
    }

    .input-with-button-container input[type="text"] {
      flex-grow: 1;
      margin-right: 10px;
    }

    .input-with-button-container button {
      padding: 8px 15px;
      background-color: #d2e4f8;
      color: black;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.8em;
      font-weight: bold;

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }

    button[type="submit"] {
      margin-top: 20px;
      padding: 10px 15px;
      background-color: #d2e4f8; /* Different color for submit button */
      color: black;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      width: 100%; /* Make submit button full width */
      font-weight: bold;
    }

    .gender {
      display: flex;
      align-items: center;
    }

    .gender label:first-child {
      margin-right: 15px;
    }

    .gender label {
      margin-top: 0;
      font-weight: bold;
      display: flex; /* Use flex to align radio and text */
      align-items: center; /* Vertically align */
    }

    .gender label input[type="radio"] {
      display: inline-block;
      margin-right: 10px;
    }

    /* Style for the error messages */
    .error-message {
      color: red;
      font-size: 0.9em;
      margin-top: 3px;
      display: block;
      text-align: center;
      margin-bottom: 3px;
    }
  }

  .ant-input-affix-wrapper.ant-input-password {
    border: none;
    padding: 8px; /* You might need to adjust padding if the border was providing spacing */
  }

  .ant-input-affix-wrapper.ant-input-password:focus,
  .ant-input-affix-wrapper.ant-input-password-focused {
    border: none;
    box-shadow: none; /* Remove focus outline if desired */
  }

  .ant-input-password-input {
    border: none;
    padding: 0; /* Adjust padding if needed */
  }

  .ant-input-password-input:focus {
    outline: none; /* Remove focus outline for the inner input */
  }
`;

export const FormItem = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #dcdcdc;

  &:last-child {
    border-bottom: none;
  }
`;

export const FormLabel = styled.label`
  width: 150px;
  margin-right: 10px;
  text-align: left;
  padding-right: 10px;
  margin-bottom: 0;
`;
