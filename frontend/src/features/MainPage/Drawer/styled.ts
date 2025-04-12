import styled from "styled-components";

export const DrawerStyled = styled.div`
  &.main-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 10px;

    .mypage-router {
      cursor: pointer;
    }

    .main-bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      width: 100%;

      .main-logout {
        width: 75%;
        cursor: pointer;
      }

      .dark-mode {
        cursor: pointer;
      }
    }
  }
`;
