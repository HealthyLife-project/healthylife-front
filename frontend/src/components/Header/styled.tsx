import styled from "styled-components";

//메인 페이지 css
export const HeaderStyled = styled.div`
  &.main-wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    //padding: 0px 20px;
    align-items: center;
    margin: 10px auto;
    //background-color: #d2e4f8;

    .main-logo {
      font-size: 35px;
      font-weight: bold;
      cursor: pointer;
    }
    .loginandsignup {
      display: flex;
      gap: 15px;
    }
    .main-login,
    .main-signup {
      background-color: white;
      border: 2px solid #e6e6e6;
      color: #333;
      font-size: 16px;
      font-weight: 700;
      padding: 8px 22px;
      border-radius: 36px;
      height: 42px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`;
