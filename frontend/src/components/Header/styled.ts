import styled from "styled-components";

// 헤더 css
export const HeaderStyled = styled.div`
  &.main-wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    align-items: center;
    margin: 10px auto;

    .main-logo {
      font-size: 35px;
      font-weight: bold;
      cursor: pointer;
    }
    .login-and-signup {
      display: flex;
      gap: 10px;
    }
    .main-login,
    .main-signup {
      background-color: white;
      border: 1px solid #333;
      color: #333;
      font-size: 14px;
      font-weight: 700;
      padding: 8px 22px;
      border-radius: 34px;
      height: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .user-name {
      font-weight: bold;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    &.main-wrap {
      .main-logo {
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
      }

      .user-name {
        font-size: 12px;
      }
      .user-name-sub {
        display: none;
      }
    }
  }
`;
