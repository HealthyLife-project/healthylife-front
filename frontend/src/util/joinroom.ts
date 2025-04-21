import api from "./chek";

export const joinChatRoom = async ({
  urlstr,
  record,
  userId,
  username,
  title,
  router,
}: {
  urlstr: string;
  record: string;
  userId: number;
  username: string;
  title: string;
  router: any;
}) => {
  if (!username) {
    alert("상세 정보를 입력해 주세요.");
    router.push("/mypage");
    return;
  }

  const res = await api.post(`/chat/${urlstr}/validate`, {
    roomid: Number(record),
    userid: userId,
  });

  const event = new CustomEvent("openChat", {
    detail: {
      title: title,
      roomid: Number(record),
      category: urlstr,
      boolean: res.data,
    },
  });

  window.dispatchEvent(event);
};
