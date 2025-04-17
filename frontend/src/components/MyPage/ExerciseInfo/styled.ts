import styled from "styled-components";

export const ExerciseInfoStyle = styled.div`
  &.main-wrap {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;

    .main-top {
      display: flex;
      width: 100%;

      .title {
        margin-bottom: 10px;
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
      margin-top: 30px;
    }
  }
`;
