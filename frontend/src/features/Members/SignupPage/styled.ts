import styled from "styled-components";

export const SignupPageStyled = styled.div`
  .signup-page-container {
    display: flex;
    flex-direction: column;
    width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 1280px;

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
    }

    h1::before {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 4px;
      transform: translateX(-50%);
      width: 80%;
    }

    h3 {
      text-align: center;
      margin-bottom: 10px;
      padding-bottom: 10px;
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
      margin-left: 5px;

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

    .gender > div {
      /* Style the container for radio buttons */
      display: flex;
      align-items: center;
    }

    .gender > div > label input[type="radio"] {
      display: inline-block;
      margin-right: 10px;
    }

    /* Style for the error messages */
    .error-message {
      color: red;
      font-size: 0.9em;
      margin-top: 3px;
      display: block;
      text-align: left;
      width: 100%;
      margin-bottom: 3px;
      margin-right: 50px;
    }
  }

  .ant-input-affix-wrapper.ant-input-password {
    border: none !important; /* Remove default border */
    border-radius: 0px;
  }

  .css-dev-only-do-not-override-1261szd.ant-input-affix-wrapper {
    padding: 0 !important;
  }
`;

export const FormItem = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  align-items: center;
  padding: 10px 15px;
  /* border-bottom: 1px solid #dcdcdc; */

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
