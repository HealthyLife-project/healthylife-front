import styled from "styled-components";

export const RecoverPasswordPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Make sure it takes up the full viewport height */
  padding: 20px; /* Add some padding around the content */

  form {
    background-color: #fff; /* White card background */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow */
    padding: 30px;
    width: 100%;
    max-width: 400px; /* Limit the width of the form */
  }

  .recover-password-container {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Spacing between elements */
    width: 100%;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333; /* Dark text color */
    text-align: center;
  }

  p {
    color: #666; /* Slightly lighter text for the description */
    text-align: center;
    margin-bottom: 20px;
  }

  .input-container {
    margin-bottom: 15px;
  }

  .email-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; /* Light gray border */
    border-radius: 4px;
    font-size: 16px;
  }

  .button-container {
    display: flex;
    justify-content: center;
  }

  button[type="submit"] {
    background-color: #d2e4f8; /* Dark blue button background */
    color: black; /* White button text */
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #d2e4f8; /* Slightly darker blue on hover */
    }
  }

  a {
    color: #1976d2; /* Link color */
    text-decoration: none;
    font-size: 14px;
    display: block;
    text-align: center;
    margin-top: 15px;

    &:hover {
      text-decoration: underline;
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

    .email-input {
      font-size: 14px;
    }

    button[type="submit"] {
      font-size: 14px;
      padding: 10px 16px;
    }

    a {
      font-size: 13px;
    }
  }
`;
