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
import * as Yup from "yup";

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

  //라디오 버튼
  const options: CheckboxGroupProps<string>["options"] = [
    { label: "남성", value: "male" },
    { label: "여성", value: "female" },
  ];

  useEffect(() => {
    setId(tokenList?.id);
  }, []);

  // 닉네임 중복확인
  const [nicknameAvailability, setNicknameAvailability] = useState<{
    result: boolean;
    message: string;
  } | null>(null);

  // 닉네임 중복확인 백엔드 요청
  const checkNicknameAvailability = async (nickname: string) => {
    try {
      const response = await api.get(`/user/findnickname/${nickname}`);
      setNicknameAvailability(response.data);
    } catch (error) {
      console.error("Error checking nickname:", error);
      setNicknameAvailability({
        result: false,
        message: "Error checking nickname",
      });
    }
  };

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
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "이름은 두 글자 이상 작성되어야 합니다.")
        .required("이름을 입력해 주세요."),
      email: Yup.string()
        .email("유효한 이메일 형식을 입력해 주세요.")
        .required("이메일을 입력해 주세요."),
      age: Yup.number()
        .typeError("숫자만 입력해 주세요.")
        .max(149, "나이는 150세 미만이어야 합니다.")
        .required("나이를 입력해 주세요."),
      phone: Yup.string()
        .matches(/^010\d{8}$/, "-를 뺀 숫자만 입력해 주세요")
        .required("전화번호를 입력해 주세요."),
    }),
    enableReinitialize: true, //state 값 update
    onSubmit: (values) => {
      //폼 안에 버튼을 눌렀을 때 생기는 것
      //console.log("values", values);
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
      title: "정말로 탈퇴할 실 건가요?",
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
        <div className="user-info">
          <div className="info-group">
            <div>
              <span className="info-title">이름</span>
            </div>
            <Input
              name="name"
              className="info-input"
              onChange={modifyFormik.handleChange}
              value={modifyFormik.values.name}
            />
            {modifyFormik.errors.name && (
              <div className="error-message">{modifyFormik.errors.name}</div>
            )}
          </div>
          <div className="info-group">
            <span className="info-title">닉네임</span>
            <div className="nickname-info">
              <Input
                className="info-input"
                name="nickname"
                onChange={modifyFormik.handleChange}
                value={modifyFormik.values.nickname}
              />
              <div>
                <Button
                  className="check-btn"
                  onClick={() =>
                    checkNicknameAvailability(modifyFormik.values.nickname)
                  }
                >
                  중복확인
                </Button>
              </div>
            </div>
            <div
              className={
                nicknameAvailability?.result === false
                  ? "error-message"
                  : "error-true"
              }
            >
              {nicknameAvailability?.message}
            </div>
          </div>
          <div className="info-group">
            <span className="info-title">이메일</span>
            <Input
              className="info-input"
              name="email"
              onChange={modifyFormik.handleChange}
              value={modifyFormik.values.email}
            />
            {modifyFormik.errors.email && (
              <div className="error-message">{modifyFormik.errors.email}</div>
            )}
          </div>
          <div className="info-group">
            <span className="info-title">나이</span>
            <Input
              className="info-input"
              name="age"
              onChange={modifyFormik.handleChange}
              value={modifyFormik.values.age}
            />
            {modifyFormik.errors.age && (
              <div className="error-message">{modifyFormik.errors.age}</div>
            )}
          </div>
          <div className="info-group">
            <span className="info-title">성별</span>
            <Radio.Group
              block
              options={options}
              value={modifyFormik.values.gender}
              onChange={(e) =>
                modifyFormik.setFieldValue("gender", e.target.value)
              }
              optionType="button"
            />
          </div>
          <div className="info-group">
            <span className="info-title">전화번호</span>
            <Input
              className="info-input"
              name="phone"
              onChange={modifyFormik.handleChange}
              value={modifyFormik.values.phone}
            />
            {modifyFormik.errors.phone && (
              <div className="error-message">{modifyFormik.errors.phone}</div>
            )}
          </div>
          <div className="info-group">
            <span className="info-title">주소</span>
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
          </div>
        </div>
        <Button
          className="info-save"
          htmlType="submit"
          disabled={!(modifyFormik.isValid && modifyFormik.dirty)}
        >
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
