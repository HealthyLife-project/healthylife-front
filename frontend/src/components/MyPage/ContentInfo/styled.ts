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
      width: 100%;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 12px;
      padding: 0;
      overflow: hidden;
    }

    .info-row {
      display: flex;
      border-bottom: 1px solid #eee;
    }

    .info-label {
      flex: 1;
      background-color: #f5f5f5;
      padding: 12px 16px;
      font-weight: 600;
      font-size: 13px;
      color: #555;
    }

    .info-value {
      flex: 4;
      padding: 12px 16px;
      font-size: 14px;
      color: #333;
    }

    .info-row:last-child {
      border-bottom: none;
    }
  }
`;
