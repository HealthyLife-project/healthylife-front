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
    //console.log(info?.source, value);
    //setPrompt(value);
    geneChange(value + "");
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

      // 응답이 JSON인지 먼저 확인
      const text = await res.text();

      // 응답을 텍스트로 받아서 확인
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
      <Search onSearch={onSearch} />
    </AiChatStyle>
  );
};

export default AiChat;
