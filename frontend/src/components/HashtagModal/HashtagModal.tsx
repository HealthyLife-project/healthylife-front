import { useState, useEffect } from "react";
import { Modal } from "antd";
import api from "@/util/chek";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HashtagForm from "@/features/Members/Hashtags/HashtagForm";

const HashtagsModal = () => {
  // const router = useRouter();

  const store = useSelector((state: RootState) => state.token.tokenList);
  const idNum = store.id;
  // const userID = store.userid;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const validateUserHashtags = async () => {
    try {
      const response = await api.get(`/hashtag/validate/${idNum}`);
      // response.data.result (true/false)
      // console.log("hashtagmodal", response.data.result);

      if (response.data.result === true) {
        setIsModalOpen(false);
      } else {
        setIsModalOpen(true);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (idNum) {
      validateUserHashtags();
    } else {
      setIsLoading(false);
    }
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
          {isModalOpen && (
            <HashtagForm userid={idNum} onCloseModal={closeModal} />
          )}
        </Modal>
      </div>
    </>
  );
};

export default HashtagsModal;
