import styled from "styled-components";

export const ContentInfoStyle = styled.div`
  &.main-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 2rem;

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
  }
`;
