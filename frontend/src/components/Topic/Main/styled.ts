import styled from "styled-components";

export const TodayTopicStyled = styled.div`
  &.main-wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px auto;

    .topic-section {
      display: flex;
      width: 100%;
      gap: 20px;

      .today-img {
        width: 32%;
      }
    }
  }
`;
