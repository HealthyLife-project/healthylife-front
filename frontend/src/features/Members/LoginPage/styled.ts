import styled from "styled-components";

//로그인 페이지 css
export const LoginPageStyled = styled.div`
  &.main-wrap {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    width: 100%;
    height: 100%;
    margin: 0px auto;
    align-items: center;
    justify-content: center;

    .main-logo {
      font-size: 40px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 130px;
      margin-bottom: 20px;
    }
    .login-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .login-inputs {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;

        .id-input,
        .password-input {
          width: 350px;
          height: 50px;
          padding: 10px;
        }
      }

      .login-btn {
        width: 100%;
        height: 40px;
        padding: 13px 20px;
        border-radius: 8px;
        background-color: #d2e4f8;
        box-sizing: border-box;
        border: none;
        font-size: 17px;
        font-weight: bolder;
        cursor: pointer;
      }
    }

    .login-sub-container,
    .login-sns {
      display: flex;
      width: 100%;
      margin-top: 20px;
      gap: 30px;
      align-items: center;
      justify-content: center;
    }
    .login-sub-container > div,
    .login-sns > div {
      cursor: pointer;
      font-size: 14px;
      color: gray;
    }

    .kakao-login {
      width: 15%;
    }

    .google-login {
      width: 15%;
    }

    .naver-login {
      width: 15%;
    }

    .imgstyle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
`;
