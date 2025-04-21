import { useRouter } from "next/router";
import api from "@/util/chek";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface UseJoinChatRoomProps {
  urlstr: string;
  username: string;
}

export default function useJoinChatRoom({
  urlstr,
  username,
}: UseJoinChatRoomProps) {
  console.log("uer", urlstr, username);
  const router = useRouter();
  const tokenList = useSelector((state: RootState) => state.token.tokenList);

  const joinRoom = async (selectedRecord: { title: string; key: string }) => {
    if (!username) {
      alert("상세 정보를 입력해 주세요.");
      router.push("/mypage");
      return;
    }

    try {
      const res = await api.post(`/chat/${urlstr}/validate`, {
        roomid: Number(selectedRecord.key),
        userid: Number(tokenList?.id),
      });

      const event = new CustomEvent("openChat", {
        detail: {
          isOpen: true,
          title: selectedRecord.title,
          roomid: Number(selectedRecord.key),
          category: urlstr,
          boolean: res.data,
        },
      });

      window.dispatchEvent(event);
    } catch (err) {
      console.log("채팅방 입장 오류", err);
    }
  };

  return joinRoom;
}
