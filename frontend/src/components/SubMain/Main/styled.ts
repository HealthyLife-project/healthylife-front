import styled from "styled-components";

export const SubMainStyled = styled.div`
  &.main-wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px auto;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 20px;

    .main-content {
      display: flex;
      width: 100%;
      gap: 20px;
    }
    .main-left,
    .main-right {
      display: flex;
      width: 50%;
      height: 100%;
    }

    .main-left {
      margin-top: 40px;
      height: 500px;
    }
    .main-right {
      flex-direction: column;
      gap: 10px;

      .search {
        display: flex;
        width: 100%;
        justify-content: end;

        .search-antd {
          width: 220px;
        }
      }

      .createRoom {
        display: flex;
        justify-content: end;
        .create-btn {
          width: 120px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .main-content {
      display: flex;
      flex-direction: column;
      width: 100%;

      .main-left,
      .main-right {
        display: flex;
        width: 100%;
        height: 100%;
      }

      .main-left {
        margin-top: 0px;
        height: 300px;
      }

      .main-right {
        flex-direction: column;
        gap: 10px;

        .search {
          display: flex;
          width: 100%;
          justify-content: end;

          .search-antd {
            width: 220px;
          }
        }

        .createRoom {
          display: flex;
          justify-content: end;
          .create-btn {
            width: 120px;
          }
        }
      }
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
