// import HashtagForm from "../../features/Members/Hashtags/HashtagForm";
// import { Button, Modal } from "antd";
// import { useState, useEffect } from "react";
// import api from "@/util/chek";
// import { RootState } from "../../redux/store";
// import { useSelector } from "react-redux";

// interface HashtagsModalProps {
//   userID: string | null;
// }

// export default function HashtagsModal({ userID }: HashtagsModalProps) {
//   // 해시태그 모달
//   // const currentUserID = useSelector(
//   //   (state: RootState) => state.token?.tokenList?.userid
//   // );

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOk = () => {
//     console.log("ok button clicked");
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   console.log("hashtag modal userID", userID);

//   const validateUserID = async () => {
//     try {
//       const response = await api.get(`/hashtag/validate/${userID}`);
//       // response.data.result (true/false)
//       console.log("modal response validate", response);
//       if (response.data.result === true) {
//         setIsModalOpen(false);
//       } else {
//         setIsModalOpen(true);
//       }
//     } catch (error: any) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (userID) {
//       validateUserID();
//     } else {
//       setIsModalOpen(true);
//     }
//   }, [userID]);

//   return (
//     <>
//       <div>
//         <Modal
//           title="Select Hashtags"
//           open={isModalOpen}
//           onOk={handleOk}
//           onCancel={handleCancel}
//           footer={null} // You can customize or remove the footer
//         >
//           <HashtagForm currentID={userID} />
//         </Modal>
//       </div>
//     </>
//   );
// }

import { useRouter } from "next/router";
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
      console.log("hashtagmodal", response.data.result);

      if (response.data.result === true) {
        setIsModalOpen(false);
      } else {
        setIsModalOpen(true);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   if (idNum) {
  //     validateUserHashtags();
  //   } else {
  //     setIsModalOpen(true);
  //   }
  // }, [idNum]);

  useEffect(() => {
    if (idNum) {
      validateUserHashtags();
    } else {
      setIsLoading(false);
    }
  }, [idNum]);

  // if (isLoading) {
  //   return null;
  // }

  return (
    <>
      <div>
        <Modal
          title="Select Hashtags"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null} // You can customize or remove the footer
        >
          <HashtagForm currentID={idNum} />
        </Modal>
      </div>
    </>
  );
};

export default HashtagsModal;
