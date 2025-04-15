import styled from "styled-components";

export const UserContentStyle = styled.div`
  &.main-wrap {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    width: 100%;
    height: 100%;
    align-items: center;

    .user-img {
      display: flex;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-top: 20px;
    }
  }

  .imgstyle {
    display: block;
    height: 150px;
    width: 150px;
    border: 1px solid #e1e1e1;
    border-radius: 50%;
    object-fit: cover;
  }
`;
