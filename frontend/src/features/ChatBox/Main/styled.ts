import styled from "styled-components";

export const ChatBoxStyled = styled.div`
  &.main-wrap {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 450px;
    height: 500px;
    background-color: #ffffff;
    z-index: 999;
    display: flex;
    flex-direction: column;

    animation: fadeInUp 0.3s ease;
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .title {
      background-color: #6ca6cd;
      color: #fff;
      font-size: 16px;
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;

      .menu {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .dropdown-container {
          position: relative;
          z-index: 999;
        }

        .dropdown-menu {
          position: absolute;
          z-index: 999;
        }

        .menu-bar {
          cursor: pointer;
        }

        .close-btn {
          color: #fff;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }

    .content-div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      background-color: #f7f9fb;
      height: 450px;

      .content-srcoll {
        height: 100%;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;

        .content {
          display: flex;
          flex-direction: column;
          background-color: #f7f9fb;
          max-height: 400px;
          height: 100%;
          padding: 16px;
          font-size: 14px;
          gap: 15px;
          min-height: 100%;
          height: auto;

          .chat-content {
            display: flex;
            background-color: white;
            width: 100%;
            padding: 10px 5px;
            border-radius: 15px;
          }
        }
      }

      .chat-input-div {
        display: flex;
        justify-content: space-around;
        background-color: #f7f9fb;
        padding: 3px 2px;

        .chat-input {
          width: 85%;
        }
      }
    }
  }
`;

export const theme = {
  token: {
    // Seed Token
    // Alias Token
  },
};
