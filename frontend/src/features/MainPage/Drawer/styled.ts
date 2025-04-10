import styled from "styled-components";

export const DrawerStyled = styled.div`
  &.main-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 10px;

    .mypage-router,
    .main-logout,
    .dark-mode {
      cursor: pointer;
    }
  }
`;
