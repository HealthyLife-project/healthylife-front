import clsx from "clsx";
import { ChatBoxStyled } from "./styled";
import { Button } from "antd";

interface ChatBoxProps {
  title: string;
  onClose: () => void;
}

const ChatBox = ({ title, onClose }: ChatBoxProps) => {
  return (
    <ChatBoxStyled className={clsx("main-wrap")}>
      <div className="title">
        {title}
        <Button
          onClick={onClose}
          size="small"
          className="close-btn"
          type="text"
        >
          ✕
        </Button>
      </div>
      <div className="content">여기에 채팅 내용이 표시됩니다.</div>
    </ChatBoxStyled>
  );
};

export default ChatBox;
