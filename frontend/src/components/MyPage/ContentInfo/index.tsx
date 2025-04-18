import { ContentInfoStyle } from "./styled"; //스타일
import clsx from "clsx";
import { Input, Button, notification, Radio, Tooltip } from "antd";
import { useFormik } from "formik";
import api from "@/util/chek";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { openNotificationWithIcon } from "@/util/notification";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import router from "next/router";
import { QuestionCircleFilled } from "@ant-design/icons";

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
  premium?: number;
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
    premium,
  } = props;

  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수
  //useState
  const [id, setId] = useState();

  const [notifi, contextHolder] = notification.useNotification();

  //라디오 버튼
  const options: CheckboxGroupProps<string>["options"] = [
    { label: "남성", value: "male" },
    { label: "여성", value: "female" },
  ];

  const text = (title: string) => {
    if (title === "name") {
      return "2글자 이상 입력해 주세요";
    }
  };

  useEffect(() => {
    setId(tokenList?.id);
  }, []);

  //수정 폼
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
          //console.log("res", res.data);
          openNotificationWithIcon("success", "성공적으로 수정하였습니다.");
        })
        .catch((error: string) => {
          //console.log("error", error);
          openNotificationWithIcon(
            "warning",
            "수정에 실패하였습니다. 다시 한번 확인해 주세요."
          );
        });
    },
  });

  //회원탈퇴 클릭
  const withdrawal = () => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "정말로 탈퇴할실 건가요?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "삭제되었습니다",
          text: "아쉽네요. 다음 기회에 만나요.",
          icon: "success",
        });

        api.delete(`/user/out/${id}`).then((res) => {
          console.log("성공");
        });

        router.push("/login");
      }
    });
  };

  return (
    <ContentInfoStyle className={clsx("main-wrap")}>
      <form className="modify-form" onSubmit={modifyFormik.handleSubmit}>
        {contextHolder}
        <div className="user-info">
          <div className="info-group">
            <div>
              <span className="info-title">이름</span>
              <Tooltip
                placement="right"
                title={text("name")}
                className="tooltip"
              >
                <QuestionCircleFilled />
              </Tooltip>
            </div>

            <Input
              name="name"
              className="info-input"
              onChange={modifyFormik.handleChange}
              value={modifyFormik.values.name}
            />
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
                onClick={() => {
                  window.daum?.Postcode &&
                    new window.daum.Postcode({
                      oncomplete: function (data: any) {
                        modifyFormik.setFieldValue("address", data.address);
                      },
                    }).open();
                }}
              />
            </span>
          </div>
        </div>
        <Button className="info-save" htmlType="submit">
          저장
        </Button>
      </form>
      <div className="withdrawal" onClick={withdrawal}>
        회원탈퇴
      </div>
    </ContentInfoStyle>
  );
};

export default ContentInfo;
