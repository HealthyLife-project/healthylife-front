import styled from "styled-components";

export const ExerciseAndMealStyle = styled.div`
  &.main-wrap {
    display: flex;
    width: 100%;

    .ai-guide {
      width: 50%;
    }
    .ai-chat {
      width: 50%;
    }
  }

  @media (max-width: 768px) {
    &.main-wrap {
      display: flex;
      flex-direction: column;
      width: 100%;

      .ai-guide {
        width: 100%;
      }
      .ai-chat {
        width: 100%;
        margin-top: 40px;
      }
    }
  }
`;
