import { AIGuidanceStyle } from "./styled"; //스타일
import clsx from "clsx";
import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";

//Component

//마이페이지 > 운동&식단 AI 가이드 컴포넌트
const AIGuidance = () => {
  //useState
  const [aicontent, setAiContent] = useState("");

  //변수선언
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY });

  async function airun() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents:
        "몸무게가 80kg이고 야외활동을 좋아하는 20대 남성의 운동 루틴을 추천해줘",
    });
    //console.log(response.text);
    const text = response.text;
    setAiContent(text ?? "");
  }

  useEffect(() => {
    airun();
  }, []);

  return (
    <AIGuidanceStyle className={clsx("main-wrap")}>
      <div className="main-ai">
        <h1>오늘의 추천 루틴</h1>
        <div>{aicontent}</div>
      </div>
    </AIGuidanceStyle>
  );
};

export default AIGuidance;
