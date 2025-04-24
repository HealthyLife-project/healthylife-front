import { Skeleton } from "antd";
import styled from "styled-components";
export const TopicElementStyled = styled.div`
  &.main-wrap {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 16px;
    //background-color: #f9f9f9;
    border-radius: 12px;
    //box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .news-elements {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .title {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 10px 14px;
      transition: all 0.2s ease;
      //box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

      a {
        font-weight: 500;
        color: #333;
        text-decoration: none;

        &:hover {
          color: #6ca6cd; /* 포인트 컬러 */
        }
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        border-color: #6ca6cd;
      }
    }

    /* 스크롤바 커스터마이징 (선택사항) */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 10px;
    }
  }
`;
export const theme = {
  token: {
    // global token
  },
  components: {
    // component token
    Skeleton: { blockRadius: 4 },
  },
};
