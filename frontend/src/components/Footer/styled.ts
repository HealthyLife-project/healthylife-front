import styled from "styled-components";

export const FooterStyled = styled.div`
  &.main-wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 150px;
    background-color: #f9f9f9;
    margin-top: 20px;
    padding: 10px 20px;

    .team,
    .submenu {
      display: flex;
      flex-direction: column;
    }
  }
`;
