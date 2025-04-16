import styled from "styled-components";

export const ChatBoxStyled = styled.div`
  &.main-wrap {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 450px;
    height: 500px;
    background-color: #ffffff;
    //border-radius: 16px;
    //box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    z-index: 999;
    display: flex;
    flex-direction: column;
    overflow: hidden;

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
      height: 100%;
      background-color: #f7f9fb;
      flex: 1;
      overflow: hidden;
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background-color: #fff;
      max-height: 420px;
      height: 100%;
      padding: 16px;
      font-size: 14px;
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
`;

export const theme = {
  token: {
    // Seed Token
    // Alias Token
  },
};
