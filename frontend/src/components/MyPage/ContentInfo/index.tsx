import { ContentInfoStyle } from "./styled"; //스타일
import clsx from "clsx";
import { Input, Button, notification, Radio } from "antd";
import { useFormik } from "formik";
import api from "@/util/chek";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { CheckboxGroupProps } from "antd/es/checkbox";

type NotificationType = "success" | "info" | "warning" | "error";

//마이페이지 > 개인정보 > 내용 컴포넌트
const ContentInfo = (props: {
  name: string;
  nickname: string;
  address: string;
  email: string;
  gender: string;
  phone: string;
  userid: string;
  hashtag: string[];
  age?: number;
}) => {
  const {
    name,
    nickname,
    address,
    email,
    gender,
    phone,
    userid,
    hashtag,
    age,
  } = props;

  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수
  //useState
  const [id, setId] = useState(tokenList.id);

  const [notifi, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    const message =
      type === "success"
        ? "성공적으로 수정했습니다"
        : type === "warning"
        ? "등록에 실패했습니다"
        : "";

    notifi[type]({
      message,
    });
  };

  const options: CheckboxGroupProps<string>["options"] = [
    { label: "남성", value: "male" },
    { label: "여성", value: "female" },
  ];

  const modifyFormik = useFormik({
    initialValues: {
      name: name || "",
      age: age || "",
      nickname: nickname || "",
      address: address || "",
      email: email || "",
      phone: phone || "",
      gender: gender || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      //폼 안에 버튼을 눌렀을 때 생기는 것
      console.log("values", values);
      api
        .post(`user/mypage/modify/${id}`, values)
        .then((res) => {
          console.log("res", res.data);
          //notification("수정완료 되었습니다");
          openNotificationWithIcon("success");
        })
        .catch((error: string) => {
          //console.log("error", error);
          openNotificationWithIcon("warning");
        });
    },
  });

  return (
    <ContentInfoStyle className={clsx("main-wrap")}>
      <form onSubmit={modifyFormik.handleSubmit}>
        {contextHolder}
        <div className="user-info">
          <div className="info-group">
            <span className="info-title">이름</span>
            <span>
              <Input
                name="name"
                className="info-input"
                onChange={modifyFormik.handleChange}
                value={modifyFormik.values.name}
              />
            </span>
          </div>
          <div className="info-group">
            <span className="info-title">닉네임</span>
            <span>
              <Input
                className="info-input"
                name="nickname"
                onChange={modifyFormik.handleChange}
                value={modifyFormik.values.nickname}
              />
            </span>
          </div>
          <div className="info-group">
            <span className="info-title">이메일</span>
            <span>
              <Input
                className="info-input"
                name="email"
                onChange={modifyFormik.handleChange}
                value={modifyFormik.values.email}
              />
            </span>
          </div>
          <div className="info-group">
            <span className="info-title">나이</span>
            <span>
              <Input
                className="info-input"
                name="age"
                onChange={modifyFormik.handleChange}
                value={modifyFormik.values.age}
              />
            </span>
          </div>
          <div className="info-group">
            <span className="info-title">성별</span>
            <span>
              <Radio.Group
                block
                options={options}
                value={modifyFormik.values.gender}
                onChange={(e) =>
                  modifyFormik.setFieldValue("gender", e.target.value)
                }
                optionType="button"
              />
            </span>
          </div>
          <div className="info-group">
            <span className="info-title">전화번호</span>
            <span>
              <Input
                className="info-input"
                name="phone"
                onChange={modifyFormik.handleChange}
                value={modifyFormik.values.phone}
              />
            </span>
          </div>
          <div className="info-group">
            <span className="info-title">주소</span>
            <span>
              <Input
                className="info-input"
                name="address"
                onChange={modifyFormik.handleChange}
                value={modifyFormik.values.address}
              />
            </span>
          </div>
        </div>
        <Button htmlType="submit">저장</Button>
      </form>
    </ContentInfoStyle>
  );
};

export default ContentInfo;
