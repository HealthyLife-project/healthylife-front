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
      gap: 10px;

      .tab-button {
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        cursor: pointer;
        background-color: #f5f5f5;
        transition: all 0.2s ease-in-out;
        font-weight: 500;

        &.active {
          background-color: #6ca6cd;
          color: white;
          border-color: #6ca6cd;
        }

        &:hover {
          background-color: #e0f0ff;
        }
      }
    }

    .tab-content {
      width: 100%;
      margin-top: 20px;
    }
  }
`;
