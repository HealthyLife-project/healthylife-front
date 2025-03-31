import styled from "styled-components";

export const SignupPageStyled = styled.div`
  .signup-page-container {
    display: flex;
    flex-direction: column;
    width: 400px; /* Example width */
    margin: 20px auto; /* Center the form */
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;

    label {
      margin-top: 10px;
      display: block;
    }

    input,
    select {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
      border: 1px solid #ddd;
      border-radius: 3px;
    }

    button {
      margin-top: 20px;
      padding: 10px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }

    label[type="radio"] {
      display: inline-block;
      margin-right: 10px;
    }
    .gender {
      display: flex;
    }
  }
`;
