import { BodyInfoStyle } from "./styled"; //스타일
import clsx from "clsx";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload, Input } from "antd";
import { createWorker } from "tesseract.js";
import { useState } from "react";
import { Formik, useFormik } from "formik";
import api from "@/util/chek";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

//Component

//바디 인폼 컴포넌트
const Bodyinfo = () => {
  //useState
  const [height, setHeight] = useState(""); //키
  const [weight, setWeight] = useState(""); //몸무게
  const [musclemass, setMusclemass] = useState(""); //골격근량
  const [fatmass, setFatmass] = useState(""); //체지방량
  const [bmi, setBmi] = useState(""); //bmi
  const [fatper, setFatper] = useState(""); //체지방률
  const [exercise, setExercise] = useState([""]); //백엔드 전송 용 배열

  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수
  const [id, setId] = useState(tokenList.token.id);

  //변수 선언

  //파일 업로드
  const props: UploadProps = {
    onChange(info) {
      const { status, originFileObj, name } = info.file;
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        //파일 업로드 성공한 경우
        message.success(`${info.file.name} file uploaded successfully`);

        if (!originFileObj) {
          message.error(
            "업로드된 파일이 유효하지 않습니다. 다른 파일을 업로드 해주세요."
          );
          return;
        }

        const imageUrl = URL.createObjectURL(originFileObj);

        (async () => {
          try {
            const worker = await createWorker("kor+eng");
            const { data } = await worker.recognize(imageUrl);
            const text = data.text;
            //console.log("OCR 결과:", text);

            // 정규표현식 추출
            const weightMatch = text.match(/체중\s*[:\s]?\s*(\d+\.\d+)/);
            const smmMatch = text.match(/골격근량\s*[:\s]?\s*(\d+\.\d+)/);
            const fatMassMatch = text.match(/체지방량\s*[:\s]?\s*(\d+\.\d+)/);
            const bmiMatch = text.match(/BMI\s*[:\s]?\s*(\d+\.\d+)/i);
            const bodyFatMatch = text.match(/체지방률\s*[:\s]?\s*(\d+\.\d+)/);

            const extractedData = {
              체중: weightMatch?.[1] || null,
              골격근량: smmMatch?.[1] || null,
              체지방량: fatMassMatch?.[1] || null,
              BMI: bmiMatch?.[1] || null,
              체지방률: bodyFatMatch?.[1] || null,
            };

            setWeight(extractedData.체중 ?? "");
            setMusclemass(extractedData.골격근량 ?? "");
            setFatmass(extractedData.체지방량 ?? "");
            setBmi(extractedData.BMI ?? "");
            setFatper(extractedData.체지방률 ?? "");

            setExercise([
              extractedData.체중 ?? "",
              extractedData.골격근량 ?? "",
              extractedData.체지방량 ?? "",
              extractedData.BMI ?? "",
              extractedData.체지방률 ?? "",
            ]);

            console.log("추출된 데이터:", extractedData);
            await worker.terminate();

            //URL 해제
            URL.revokeObjectURL(imageUrl);
          } catch (error) {
            console.error("OCR 처리 중 오류 발생:", error);
            message.error("이미지 분석 중 오류가 발생했습니다.");
          }
        })();
      } else if (info.file.status === "error") {
        message.error("파일 업로드에 실패했습니다.");
      }
    },
  };

  const SubmitFormik = useFormik({
    initialValues: {
      height: "",
      weight: "",
      musclemass: "",
      fatmass: "",
      bmi: "",
      fatper: "",
    },
    onSubmit: (values) => {
      //폼 안에 버튼을 눌렀을 때 생기는 것
      //console.log("values", values);
      api
        .post(`/exerciseinfo/${id}`, exercise)
        .then((res) => {
          console.log("전송 성공했습니다.");
        })
        .catch((error: string) => {
          console.log("전송 실패 에러: ", error);
        });
    },
  });
  return (
    <BodyInfoStyle>
      <div>
        <h1>인바디 정보</h1>
        <form onSubmit={SubmitFormik.handleSubmit}>
          <div>
            키
            <Input
              placeholder="키를 입력해 주세요"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            몸무게
            <Input
              placeholder="몸무게를 입력해 주세요"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            골격근량
            <Input
              placeholder="골격근량를 입력해 주세요"
              value={musclemass}
              onChange={(e) => setMusclemass(e.target.value)}
            />
          </div>
          <div>
            체지방량
            <Input
              placeholder="체지방량를 입력해 주세요"
              value={fatmass}
              onChange={(e) => setFatmass(e.target.value)}
            />
          </div>
          <div>
            BMI
            <Input
              placeholder="BMI를 입력해 주세요"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
            />
          </div>
          <div>
            체지방률
            <Input
              placeholder="체지방률을 입력해 주세요"
              value={fatper}
              onChange={(e) => setFatper(e.target.value)}
            />
          </div>
          <Button htmlType="submit">저장</Button>
        </form>
      </div>
      <Upload {...props} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </BodyInfoStyle>
  );
};

export default Bodyinfo;
