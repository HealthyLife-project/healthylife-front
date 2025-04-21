import HashtagPage from "@/features/Members/Hashtags/HashtagForm";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Hashtag() {
  const store = useSelector((state: RootState) => state.token.tokenList);
  const idNum = store?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (idNum === undefined) return null;

  return <HashtagPage userid={idNum} onCloseModal={closeModal} />;
}
