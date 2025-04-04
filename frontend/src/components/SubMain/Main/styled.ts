import styled from "styled-components";

export const SubMainStyled = styled.div`
  &.main-wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    //justify-content: space-between;
    //padding: 0px 20px;
    align-items: center;
    margin: 0px auto;
    gap: 10px;
    align-items: flex-start;

    .main-left,
    .main-right {
      display: flex;
      width: 50%;
      height: 100%;
      //border: 1px solid black;
    }

    .main-left {
      position: -webkit-sticky;
      position: sticky;
      top: 0px;
    }
    .main-right {
      flex-direction: column;
    }
  }
`;

export const theme = {
  token: {
    // global token
  },
  components: {
    // component token
    Button: { defaultHoverBorderColor: "#000", defaultHoverColor: "#000" },
  },
};
