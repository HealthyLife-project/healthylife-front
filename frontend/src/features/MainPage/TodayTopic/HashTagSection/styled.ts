import styled from "styled-components";

export const HashTagSectionStyled = styled.div`
  &.main-wrap {
    width: 100%;
    height: 250px;
    overflow: hidden;
    position: relative;

    .scroll-track-1 {
      display: flex;
      width: max-content;
      gap: 30px;
      margin: 20px 0px;
      animation: scroll-left 10s linear infinite;
    }

    .hashtag-element {
      flex-shrink: 0;
      min-width: 120px;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 0 16px;
      font-size: 14px;
      white-space: nowrap;
    }

    @keyframes scroll-left {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  }
`;
