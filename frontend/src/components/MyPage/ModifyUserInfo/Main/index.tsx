import { useEffect, useRef, useState } from "react";
import { ModifyUserInfoStyle } from "./styled"; //스타일
import clsx from "clsx";

import { Button, Modal } from "antd";

//Component
import Pay from "@/features/Pay";

//마이페이지 > 개인정보 수정 컴포넌트
const ModifyUserInfo = () => {
  //useState
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  //모달 열기
  const showPayModal = () => {
    setOpen(true);
  };

  //모달 OK 버튼
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  //모달 취소 버튼
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <ModifyUserInfoStyle className={clsx("main-wrap")}>
      <h1>🎉 프리미엄 플랜 구독</h1>
      <span className="content-span">AI 기능을 무제한으로 이용해보세요!</span>
      <span className="content-span">
        AI를 통한 개인 맞춤형 운동과 식단 추천 기능 제공
      </span>
      <div className="price">
        💰 <strong>5,500원 / 월</strong>
      </div>
      <div className="price-btn">
        <Button onClick={showPayModal}>결제하기</Button>
      </div>
      <Modal
        title="토스 결제하기"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={500}
      >
        <Pay />
      </Modal>
    </ModifyUserInfoStyle>
  );
};

export default ModifyUserInfo;
