import { useState } from "react";
import { AiChatStyle } from "./styled";
import clsx from "clsx";

//antd
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const AiChat = () => {
  const [prompt, setPrompt] = useState("");
  const [res, setRes] = useState("");

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    geneChange(value);
    setPrompt("");
  };

  const geneChange = async (prompt: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ORIGIN_URL}/ai/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      const text = await res.text();
      setRes(text);
    } catch (error) {
      console.error("에러 발생:", error);
      setRes("API 호출 실패");
    }
  };

  return (
    <AiChatStyle className={clsx("main-wrap")}>
      <h1 className="title">AI에게 물어보세요!</h1>
      <div className="answer">{res}</div>

      <Search
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onSearch={onSearch}
        enterButton
      />
    </AiChatStyle>
  );
};

export default AiChat;
