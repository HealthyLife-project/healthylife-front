import { useState, useEffect } from "react";
import { Modal } from "antd";
import api from "@/util/chek";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HashtagForm from "@/features/Members/Hashtags/HashtagForm";

const HashtagsModal = () => {
  const store = useSelector((state: RootState) => state.token.tokenList);
  const idNum = store?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const ERROR_MESSAGE =
    "죄송합니다. 해시태그 유효성 확인에 실패했습니다. 나중에 다시 시도해 주십시오.";

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // useEffect 를 사용하여 idNum 이 있으면 validateUserHashtags
    // 실행 [idNum] 을 찾을때 까지
    if (!idNum) return;

    const validateUserHashtags = async () => {
      try {
        const response = await api.get(`/hashtag/validate/${idNum}`);
        if (response.data.result === true) {
          setIsModalOpen(false);
        } else {
          setIsModalOpen(true);
        }
      } catch (error: any) {
        console.error(error);
        setErrorMessage(ERROR_MESSAGE);
      }
    };

    validateUserHashtags();
  }, [idNum]);

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <Modal
          title="해시태그를 선택해 주세요"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {isModalOpen && (
            <HashtagForm userid={idNum} onCloseModal={closeModal} />
          )}
        </Modal>
      </div>
    </>
  );
};

export default HashtagsModal;
