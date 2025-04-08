// components/ChatBox.tsx
import { Button } from "antd";

interface ChatBoxProps {
  title: string;
  onClose: () => void;
}

const ChatBox = ({ title, onClose }: ChatBoxProps) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        height: "400px",
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        borderRadius: "8px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "10px",
          backgroundColor: "#6ca6cd",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {title}
        <Button
          onClick={onClose}
          size="small"
          style={{ float: "right", color: "#fff", border: "none" }}
          type="text"
        >
          ✕
        </Button>
      </div>
      <div style={{ flex: 1, padding: "10px" }}>
        여기에 채팅 내용이 표시됩니다.
      </div>
    </div>
  );
};

export default ChatBox;
