import styled from "styled-components";

export const MyMain = styled.div`
  &.main-wrap {
    max-width: 1280px;
    width: 100%;
    height: 500px;
    margin: 0px auto;

    .tabs-header {
      width: 100%;
    }
  }
`;

export const theme = {
  token: {
    // global token
  },
  components: {
    // component token
    Tabs: {
      titleFontSize: 20,
      itemSelectedColor: "#2A2A2A",
      itemHoverColor: "#2A2A2A",
      cardGutter: 0,
      cardPadding: "15px 100px", // "Tabs" 키 아래 정의해야 함
    },
  },
};
