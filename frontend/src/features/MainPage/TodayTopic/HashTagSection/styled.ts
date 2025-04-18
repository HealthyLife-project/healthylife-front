import styled from "styled-components";

export const HashTagSectionStyled = styled.div`
  &.main-wrap {
    width: 100%;
    height: 250px;
    overflow: hidden;
    border: 1px solid black;
    border-radius: 20px;
    padding: 10px;

    .scroll-track {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      animation: scroll-left 1s linear infinite;
      width: max-content;
    }

    .hashtag-element {
      flex-shrink: 0;
      display: flex;
      min-width: 100px;
      height: 40px;
      border: 1px solid black;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background-color: #f0f0f0;
      white-space: nowrap;
    }

    @keyframes scroll-left {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  }
`;
