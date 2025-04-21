import { ImageElementStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import api from "@/util/chek";

//Coponent

//today topic 요소 컴포넌트
const TopicElement = (props: { hash: string }) => {
  const { hash } = props;
  const router = useRouter();
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY });
  const [imgsrc, setImgsrc] = useState("");
  async function airun() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${hash}을 영어 단어로 바꿔줘. 만약 '해'라는 글자가 왔으면 'sun'만 출력해줘`,
    });
    const text = response.text;
    //console.log("text", text);

    api.post("/ai/imageText", { text: text }).then((res) => {
      //console.log("src res", res.data[0]);
      setImgsrc(res.data[0]);
    });
  }

  useEffect(() => {
    //ai 실행
    //console.log("hash", hash[0]);

    airun();
  }, [hash]);

  return (
    <ImageElementStyled className={clsx("main-wrap")}>
      <img src={imgsrc} className="imgstyle" alt="ai-img" />
    </ImageElementStyled>
  );
};
export default TopicElement;
