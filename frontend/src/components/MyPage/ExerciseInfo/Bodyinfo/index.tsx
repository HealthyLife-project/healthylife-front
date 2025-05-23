import { BodyInfoStyle } from "./styled"; //스타일
import clsx from "clsx";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload, Input, Tooltip } from "antd";
import { createWorker } from "tesseract.js";
import { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import api from "@/util/chek";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { openNotificationWithIcon } from "@/util/notification";

//Component

//바디 인폼 컴포넌트
const Bodyinfo = () => {
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState
  const [height, setHeight] = useState(""); //키
  const [weight, setWeight] = useState(""); //몸무게
  const [musclemass, setMusclemass] = useState(""); //골격근량
  const [fatmass, setFatmass] = useState(""); //체지방량
  const [bmi, setBmi] = useState(""); //bmi
  const [fatper, setFatper] = useState(""); //체지방률
  //const [exercise, setExercise] = useState([""]); //백엔드 전송 용 배열
  const [id, setId] = useState();

  //변수 선언
  const text = <span>이미지를 업로드 하면 자동으로 입력되요!</span>; //이미지 버튼 호버

  //useEffect
  useEffect(() => {
    setId(tokenList?.id);
  }, []);

  //파일 업로드
  const props: UploadProps = {
    onChange(info) {
      const { status, originFileObj, name } = info.file;
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
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

            setFieldValue("weight", extractedData.체중);
            setFieldValue("musclemass", extractedData.골격근량);
            setFieldValue("fatmass", extractedData.체지방량);
            setFieldValue("bmi", extractedData.BMI);
            setFieldValue("fatper", extractedData.체지방률);

            //console.log("추출된 데이터:", extractedData);
            await worker.terminate();

            //URL 해제
            URL.revokeObjectURL(imageUrl);
          } catch (error) {
            //console.error("OCR 처리 중 오류 발생:", error);
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
        .post(`inbody/exerciseinfo/${id}`, values)
        .then((res) => {
          openNotificationWithIcon("success", "성공적으로 등록하였습니다.");
        })
        .catch((error: string) => {
          //console.log("전송 실패 에러: ", error);
        });
    },
  });

  const { setFieldValue } = SubmitFormik;
  return (
    <BodyInfoStyle className={clsx("main-wrap")}>
      <h1>인바디 정보</h1>
      <form onSubmit={SubmitFormik.handleSubmit}>
        <div className="inbody-input-form">
          <div className="inbody-row">
            <span className="inbody-title">키</span>
            <Input
              className="inbody-input"
              name="height"
              value={SubmitFormik.values.height}
              onChange={SubmitFormik.handleChange}
            />
          </div>
          <div className="inbody-row">
            <span className="inbody-title">체중</span>
            <Input
              className="inbody-input"
              name="weight"
              value={SubmitFormik.values.weight}
              onChange={SubmitFormik.handleChange}
            />
          </div>
          <div className="inbody-row">
            <span className="inbody-title">골격근량</span>
            <Input
              className="inbody-input"
              name="musclemass"
              value={SubmitFormik.values.musclemass}
              onChange={SubmitFormik.handleChange}
            />
          </div>
          <div className="inbody-row">
            <span className="inbody-title">체지방량</span>
            <Input
              className="inbody-input"
              name="fatmass"
              value={SubmitFormik.values.fatmass}
              onChange={SubmitFormik.handleChange}
            />
          </div>
          <div className="inbody-row">
            <span className="inbody-title">BMI</span>
            <Input
              className="inbody-input"
              name="bmi"
              value={SubmitFormik.values.bmi}
              onChange={SubmitFormik.handleChange}
            />
          </div>
          <div className="inbody-row">
            <span className="inbody-title">체지방률</span>
            <Input
              className="inbody-input"
              name="fatper"
              value={SubmitFormik.values.fatper}
              onChange={SubmitFormik.handleChange}
            />
          </div>
        </div>

        <div className="btn-group">
          <Tooltip placement="top" color={"geekblue"} title={text}>
            <Upload {...props} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Tooltip>
          <Button htmlType="submit" className="save-btn">
            저장
          </Button>
        </div>
      </form>
    </BodyInfoStyle>
  );
};

export default Bodyinfo;
