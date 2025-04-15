import styled from "styled-components";

export const ContentInfoStyle = styled.div`
  &.main-wrap {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    width: 100%;
    height: 100%;
    align-items: center;
    margin-top: 15px;

    .user-info {
      width: 350px;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .info-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 15px;

        .info-title {
          color: #333;
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
          letter-spacing: -0.28px;
        }
        .info-input {
          display: flex;
          width: 100%;
          font-size: 16px;
          min-height: 50px;
          padding: 15px 13px;
          align-items: flex-start;
          border-radius: 5px;
          border: 1px solid #e1e2e3;
          background: none;
        }
      }
    }

    .info-save {
      height: 35px;
      width: 120px;
    }
  }

  @media (max-width: 486px) {
    &.main-wrap {
      width: 100%;

      .modify-form {
        width: 100%;
        display: flex;
        flex-direction: column;

        .user-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 13px;

          .info-group {
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: center;
            margin: 0px auto;
            margin-bottom: 13px;

            .info-title {
              color: #333;
              font-size: 14px;
              font-weight: 700;
              line-height: 20px;
              letter-spacing: -0.28px;
            }

            .info-input {
              display: flex;
              width: 80%;
              font-size: 16px;
              height: 100%;
              padding: 11px 13px;
              align-items: flex-start;
              border-radius: 5px;
              border: 1px solid #e1e2e3;
              background: none;
            }
          }
        }
      }
    }
  }
`;
