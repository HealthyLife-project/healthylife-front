import styled from "styled-components";

//메인 페이지 css
export const MainStyled = styled.div`
  &.main-wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    //justify-content: space-between;
    padding: 0px 20px;
    align-items: center;
    margin: 0px auto;
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;
