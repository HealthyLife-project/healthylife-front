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

    .title {
      display: flex;
      width: 100%;
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }
    .topic-section {
      display: flex;
      width: 100%;
      gap: 20px;

      .today-img {
        width: 32%;
      }
    }
  }

  @media (max-width: 486px) {
    &.main-wrap {
      max-width: 1280px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0px auto;

      .title {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        gap: 10px;
      }
      .topic-section {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 20px;
        text-align: center;

        .today-img {
          width: 100%;
        }
      }
    }
  }
`;
