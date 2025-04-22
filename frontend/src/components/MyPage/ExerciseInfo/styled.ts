import styled from "styled-components";

export const ExerciseInfoStyle = styled.div`
  &.main-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;

    .main-top {
      display: flex;
      width: 100%;

      .title {
        text-align: center;
        margin-bottom: 10px;
        font-size: 26px;
        color: #333;
      }

      .main-map {
        width: 50%;
        height: 380px;
      }
      .main-info {
        width: 50%;
        height: 100%;
      }
    }

    .inbody {
      h1 {
        margin-top: 30px;
        text-align: center;
        font-size: 26px;
        color: #333;
      }
    }
  }

  @media (max-width: 768px) {
    &.main-wrap {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      width: 100%;

      .main-top {
        display: flex;
        height: 100%;
        flex-direction: column;

        .title {
          margin-bottom: 10px;
        }

        .main-map {
          width: 100%;
          height: 300px;
        }
        .main-info {
          margin-top: 80px;
          width: 100%;
          height: 100%;
        }
      }

      .inbody {
        margin-top: 30px;
      }
    }
  }
`;
