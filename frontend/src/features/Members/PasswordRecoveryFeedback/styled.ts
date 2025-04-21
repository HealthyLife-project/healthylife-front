import styled from "styled-components";
import Link from "next/link";

export const PasswordRecoveryFeedbackPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  max-width: 1280px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }

  p {
    color: #666;
    margin-bottom: 30px;
    padding: 0 20px;
  }

  .link-container {
    /* 링크를 감싸는 div에 대한 스타일 */
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 20px;
    }

    p {
      font-size: 14px;
      padding: 0 10px;
    }
  }
`;

export const StyledLink = styled(Link)`
  color: #1976d2;
  text-decoration: none;
  font-size: 16px;
  padding: 10px 20px;
  border: 1px solid #1976d2;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #1976d2;
    color: white;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;
