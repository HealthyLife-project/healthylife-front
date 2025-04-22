import styled from "styled-components";

export const MyMain = styled.div`
  &.main-wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0px 20px;
    text-align: center;
    justify-content: center;

    .tabs-header {
      display: flex;
      justify-content: center;
      margin: 20px 0;
      gap: 15px;

      .tab-button {
        padding: 18px 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        &.active {
          background-color: #6ca6cd;
          color: white;
          border-color: #6ca6cd;
        }
      }
    }

    .tab-content {
      width: 100%;
      //margin-top: 20px;
    }
  }

  @media (max-width: 768px) {
    &.main-wrap {
      .tabs-header {
        display: flex;
        justify-content: center;
        margin: 20px 0;
        gap: 12px;

        .tab-button {
          padding: 15px 17px;
          border: 1px solid #ccc;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          font-size: 12px;
          &.active {
            background-color: #6ca6cd;
            color: white;
            border-color: #6ca6cd;
          }
        }
      }

      .tab-content {
        width: 100%;
      }
    }
  }

  @media (max-width: 480px) {
  }
`;
