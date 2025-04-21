import styled from "styled-components";

export const MainBannerStyled = styled.div`
  &.main-wrap {
    width: 100%;
    margin-top: 10px;

    .swiper {
      width: 100%;
      height: 300px;
      border-radius: 20px;
      cursor: pointer;
      aspect-ratio: 16 / 9;

      .imgstyle {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    .swiper {
      aspect-ratio: 4 / 3;
    }
  }
`;
