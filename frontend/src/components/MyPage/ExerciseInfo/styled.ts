import styled from "styled-components";

export const ExerciseInfoStyle = styled.div`
  &.main-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;

    .main-top {
      display: flex;

      .main-map {
        width: 50%;
        height: 500px;
      }
      .main-info {
        width: 50%;
        height: 100%;
      }
    }
  }
`;
