import styled from "styled-components";

export const FooterStyled = styled.div`
  &.main-wrap {
    display: flex;
    justify-content: center;
    text-align: center;
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

    .team {
      justify-content: center;
      gap: 10px;

      .team-company {
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
      }

      .team-content {
        font-weight: 400;
        font-size: 13px;
        letter-spacing: -0.2px;
        color: #777;
      }

      .github {
        cursor: pointer;
      }
    }
  }
`;
