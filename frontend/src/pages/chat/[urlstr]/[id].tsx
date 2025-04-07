import ChatRoom from "@/features/ChatRoom";
import { useRouter } from "next/router";

const ChattingRoom = () => {
  const router = useRouter();

  const { id, urlstr } = router.query;
  //id type은 string으로 고정 //string[] or undefined 접근 불가능

  return <ChatRoom id={id as string} urlstr={urlstr as string} />;
};

export default ChattingRoom;
