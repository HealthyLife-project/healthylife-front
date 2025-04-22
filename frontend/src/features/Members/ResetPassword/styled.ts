import styled from "styled-components";

export const ResetPasswordPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;

  form {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 100%;
    max-width: 400px;
  }

  .reset-password-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
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

  .input-container {
    margin-bottom: 15px;
  }

  .new-password-input,
  .confirm-password-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .input-error {
    border: 1px solid #ff4d4f;
  }

  .error-message {
    color: #ff4d4f;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    text-align: left;
  }

  .success-message {
    color: green;
    font-size: 0.9em;
    margin-top: 4px;
    margin-bottom: 4px;
    text-align: left;
  }

  .button-container {
    display: flex;
    justify-content: center;
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

    &:hover {
      background-color: #a6c8f7;
    }
  }

  @media (max-width: 768px) {
    form {
      padding: 20px;
    }

    h1 {
      font-size: 20px;
    }

    p {
      font-size: 14px;
    }

    .new-password-input,
    .confirm-password-input {
      font-size: 14px;
    }

    button[type="submit"] {
      font-size: 14px;
      padding: 10px 16px;
    }
  }
`;
