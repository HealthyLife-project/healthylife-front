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
      width: 100%;
      padding-left: 24px;
    }

    .mypage-router-menu {
      .menu {
        width: 100%;
        border: none;
      }
    }

    .main-bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      width: 100%;

      .main-logout {
        width: 120px;
        cursor: pointer;
      }

      .dark-mode {
        cursor: pointer;
      }
    }
  }
`;

export const theme = {
  token: {
    // Seed Token
    // Alias Token

    components: {
      Menu: {},
    },
  },
};
