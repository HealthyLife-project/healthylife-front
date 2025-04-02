import styled from "styled-components";

export const LCategoryStyled = styled.div`
  &.main-wrap {
    width: 100%;
    display: flex;
    gap: 20px;
    margin: 10px 0px;

    &.main-wrap > div {
      cursor: pointer;
    }

    .person,
    .pet {
      position: relative;
    }
    .person::after,
    .pet::after {
      content: "";
      position: absolute;
      left: 0px;
      bottom: -2px;
      width: 100%;
      height: 1px;
      background-color: black;
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.2s ease-in-out;
    }

    .person:hover::after,
    .pet:hover::after {
      transform: scaleX(1);
    }

    .person.clicked::after,
    .pet.clicked::after {
      transform: scaleX(1);
    }
  }
`;
