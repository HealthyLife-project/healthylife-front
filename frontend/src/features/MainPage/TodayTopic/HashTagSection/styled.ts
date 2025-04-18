import styled from "styled-components";
export const HashTagSectionStyled = styled.div`
  &.main-wrap {
    display: flex;
    flex-wrap: wrap; // 여러 줄로 감기게 함
    width: 100%;
    height: 250px;
    border: 1px solid black;
    border-radius: 20px;
    padding: 10px;
    gap: 10px;
    overflow: hidden;
    position: relative;

    .hashtag-element {
      display: flex;
      min-width: 100px;
      height: 40px;
      border: 1px solid black;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-radius: 10px;
      white-space: nowrap;

      animation: scroll-left 2s linear infinite;
    }

    @keyframes scroll-left {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  }
`;
