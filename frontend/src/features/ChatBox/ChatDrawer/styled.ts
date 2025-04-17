import styled from "styled-components";

export const DrawerStyled = styled.div`
  &.main-wrap {
    position: fixed;
    bottom: 20px;
    right: 470px;
    width: 220px;
    height: 500px;
    background-color: #ffffff;
    //border-radius: 16px;
    //box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    z-index: 9998;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .drawer-header {
      height: 40px;
      background-color: #6ca6cd;
      color: #fff;
      font-size: 16px;
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .drawer-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background-color: #f7f9fb;
      gap: 15px;
      padding: 10px 0px;

      .chat-element {
        width: 100%;
        height: 40px;
        display: flex;
        background-color: white;
        cursor: pointer;
        font-size: 13px;
        align-items: center;
        padding: 0px 5px;

        &.active {
          background-color: #6ca6cd;
        }
      }
    }

    .close-btn {
      font-size: 18px;
      cursor: pointer;
    }
  }
`;
