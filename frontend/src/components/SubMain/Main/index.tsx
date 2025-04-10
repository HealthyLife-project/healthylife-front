import { SubMainStyled, theme } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button, ConfigProvider } from "antd";
import { convertChatList, ConvertedChatData } from "@/util/chek";

//antd
import { Input, Space } from "antd";
import type { GetProps } from "antd";

//Coponent
import KAKAOMap from "@/components/Map";
import SubCategory from "../SubCategory";
import api from "@/util/chek";

//antd - seach
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

//submain > main 컴포넌트
const SubMain = () => {
  const router = useRouter();

  //useState
  const [urlstr, setUrlStr] = useState(""); //person or pet
  const [search, setSearch] = useState<ConvertedChatData[]>([]); //search 변수

  useEffect(() => {
    //console.log(window.location.pathname);

    //현재 선택된 Lcategory 확인
    let pathname = window.location.pathname; //pathName person인지 pet인지 확인용
    if (pathname.includes("person")) {
      setUrlStr("person");
    } else if (pathname.includes("pet")) {
      setUrlStr("pet");
    } else {
      setUrlStr("");
    }
  }, [urlstr]);

  //NewChat 클릭 함수
  const NewChat = () => {
    router.push(`/createchat?category=${urlstr}`);
  };

  //serach 클릭 함수
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info, value);
    api
      .post("/chat/search", { value: value })
      .then((res) => {
        //console.log("res", res.data);

        //배열 가공
        const converedData = convertChatList(res.data);
        setSearch(converedData);
      })
      .catch((error: string) => {
        console.log("search error", error);
      });
  };

  //변수 선언

  return (
    <SubMainStyled className={clsx("main-wrap")}>
      <div className="search">
        <Search
          className="search-antd"
          placeholder="채팅방 이름을 입력하시오"
          onSearch={onSearch}
        />
      </div>
      <div className="main-content">
        <div className="main-left">
          <KAKAOMap />
        </div>

        <div className="main-right">
          <ConfigProvider theme={theme}></ConfigProvider>
          <SubCategory urlstr={urlstr} search={search} />
          <ConfigProvider theme={theme}>
            <Button onClick={NewChat}>방 생성하기</Button>
          </ConfigProvider>
        </div>
      </div>
    </SubMainStyled>
  );
};
export default SubMain;
