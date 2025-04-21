import styled from "styled-components";

export const HashTagSectionStyled = styled.div`
  &.main-wrap {
    width: 100%;
    height: 250px;
    overflow: hidden;
    position: relative;
    padding: 10px 0;

    .scroll-track {
      display: flex;
      width: max-content;
      animation: scroll-left 5s linear infinite;
      gap: 0 40px;
    }

    .hashtag-element {
      flex-shrink: 0;
      min-width: 120px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 0 16px;
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
