import styled from "styled-components";

export const SubCategoryStyled = styled.div`
  &.main-wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    //display: grid;
    //grid-template-columns: repeat(2, 1fr);
    //gap: 20px;
    align-items: center;
    margin: 0px auto;

    .sub-element {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
`;
