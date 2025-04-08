import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});
export default api;

//배열 가공
interface RawChatData {
  id: number;
  title: string;
  cnt?: number;
}

export interface ConvertedChatData {
  key: string;
  title: string;
  cnt: number;
}

export const convertChatList = (
  data: RawChatData[] | RawChatData
): ConvertedChatData[] => {
  const list = Array.isArray(data) ? data : [data];

  return list.map((item) => ({
    key: String(item.id),
    title: item.title,
    cnt: item.cnt ?? 0,
  }));
};
