import { ImageElementStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import api from "@/util/chek";
import defaultImg from "@/assets/images/healthy-life.jpg";
//Coponent

//today topic 요소 컴포넌트
const TopicElement = (props: { hash: string }) => {
  const { hash } = props;
  const router = useRouter();
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY });
  const [imgsrc, setImgsrc] = useState("");
  async function airun() {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: hash,
        targetLang: "EN", // 영어로 번역
      }),
    });

    const data = await res.json(); // 여기가 맞는 파싱 방식
    const translatedText = data.result;

    const imageRes = await api.post("/ai/imageText", { text: translatedText });

    const image = imageRes.data.length > 0 ? imageRes.data[0] : defaultImg.src;

    setImgsrc(image);
  }

  useEffect(() => {
    if (!hash) return;

    const timer = setTimeout(() => {
      airun();
    }, 500); // 0.5초 뒤 실행

    return () => clearTimeout(timer); // cleanup
  }, [hash]);

  return (
    <ImageElementStyled className={clsx("main-wrap")}>
      <img src={imgsrc} className="imgstyle" alt="ai-img" />
    </ImageElementStyled>
  );
};
export default TopicElement;
