import { AIGuidanceStyle } from "./styled"; //스타일
import clsx from "clsx";
import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";
import api from "@/util/chek";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

//Component

//마이페이지 > 운동&식단 AI 가이드 컴포넌트
const AIGuidance = () => {
  //변수선언
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY });
  const tokenList = useSelector((state: RootState) => state.token.tokenList);

  //useState
  const [aicontent, setAiContent] = useState("");
  const [id, setId] = useState(tokenList?.id);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [muscleMass, setMuscleMess] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  async function airun() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `몸무게가 ${weight}kg이고 키가 ${height}인 야외활동을 좋아하는 나이가 ${age}세인 ${gender}의 운동 루틴을 추천해줘 참고로 100자 이내로 작성해줘`,
    });
    //console.log(response.text);
    const text = response.text;
    setAiContent(text ?? "");
  }

  useEffect(() => {
    api
      .get(`/inbody/currentinfo/${id}`)
      .then((res) => {
        //console.log("res", res.data);
        setHeight(res.data.height);
        setMuscleMess(res.data.muscleMass);
        setWeight(res.data.weight);
      })
      .catch((error: string) => {
        console.log("inbody current info error", error);
      });
    api.get(`/user/${id}`).then((res) => {
      //console.log("res", res.data);
      setAge(res.data.age);
      setGender(res.data.gender);
    });

    //ai 실행
    airun();
  }, []);

  return (
    <AIGuidanceStyle className={clsx("main-wrap")}>
      <div className="main-ai">
        <h1 className="title">오늘의 추천 루틴</h1>
        <div>{aicontent}</div>
      </div>
    </AIGuidanceStyle>
  );
};

export default AIGuidance;
