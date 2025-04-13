import styled from "styled-components";

export const ModifyUserInfoStyle = styled.div`
  &.main-wrap {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    width: 100%;
    height: 100vh;
    margin: 0px auto;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-top: -100px;

    h1 {
      font-size: 1.7rem;
      margin-bottom: 15px;
    }

    .content-span {
      margin-bottom: 12px;
      font-size: 15px;
      color: #444;
    }

    .price {
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 20px;
      color: #222;
    }

    .price-btn {
    }
  }
`;
