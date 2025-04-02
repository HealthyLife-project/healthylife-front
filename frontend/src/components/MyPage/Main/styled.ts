import styled from "styled-components";

export const MyMain = styled.div`
  &.main-wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 0px 20px;
    align-items: center;
    margin: 10px auto;

    .tabs-header {
      width: 100%;
    }
  }
`;

//Design Component
export const theme = {
  token: {
    // global token
  },
  components: {
    // component token
    Tabs: {
      titleFontSize: 16,
      itemSelectedColor: "#2A2A2A",
      itemHoverColor: "#2A2A2A",
      cardGutter: 5,
      cardPadding: "12px 110px", // "Tabs" 키 아래 정의해야 함
    },
  },
};
