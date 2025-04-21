import styled from "styled-components";

export const DrawerHeaderStyle = styled.div`
  &.main-wrap {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .mypage-router {
      cursor: pointer;
    }
    .heart-img {
      width: 17px;
      height: 17px;
      cursor: pointer;

      .imgstyle {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
