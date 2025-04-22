import styled from "styled-components";

export const HashTagStyle = styled.div`
  &.main-wrap {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    width: 100%;
    margin: 60px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  h1 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 24px;
    text-align: center;
    color: #262626;
  }

  .hash-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;

    gap: 30px;

    .hash-section {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      width: 100%;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .hash-content {
      width: 100px;
      padding: 6px 12px;
      background-color: #e0e0e0;
      border-radius: 15px;
      font-size: 14px;
      color: #262626;
      border: 1px solid #dbdbdb;
      transition: all 0.2s ease-in-out;
    }

    .hash-content.selected {
      background-color: #add8e6;
    }
  }
`;
