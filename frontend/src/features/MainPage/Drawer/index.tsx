import clsx from "clsx";
import { DrawerStyled, theme } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/chek";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setTokenList } from "@/redux/redux";
import { setTheme, selectTheme } from "@/redux/theme";

//antd
import type { MenuProps } from "antd";
import { Button, Segmented, Menu, ConfigProvider } from "antd";
import {
  MoonOutlined,
  SunOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";

type MenuItem = Required<MenuProps>["items"][number];

//Drawer 컴포넌트
const DrawerContainer = () => {
  //변수 선언
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useSelector(selectTheme);
  const tokenList = useSelector((state: RootState) => state.token.tokenList);

  //useState
  const [id, setId] = useState(tokenList?.id);
  const [petlist, setPetlist] = useState([]); //사용자가 속해있는 pet 채팅방 리스트
  const [personlist, setPersonList] = useState([]); //사용자가 속해있는 person 채팅방 리스트
  const chatlist: any[] = [];

  //useEffect
  useEffect(() => {
    api.get(`/chat/pet/${id}`).then((res) => {
      let pet_data = res.data;

      console.log("res pet", pet_data);

      setPetlist(pet_data);
      //chatlist.push(res.data);
    });

    api.get(`/chat/person/${id}`).then((res) => {
      setPersonList(res.data);
      chatlist.push(res.data);
      //console.log("res person", res.data);
    });

    console.log("chat", petlist);
  }, [tokenList?.id]);

  const items: MenuItem[] = [
    {
      key: "sub1",
      label: "채팅방 목록",
      children: [
        {
          key: "g1",
          label: "Pet",
          type: "group",
          children: petlist.map((pet: any, index: number) => ({
            key: `pet-${index}`,
            label: pet.title,
            onClick: () => {
              //console.log("Pet chat clicked:", pet);
            },
          })),
        },

        {
          key: "g2",
          label: "Person",
          type: "group",
          children: personlist.map((person: any, index: number) => ({
            key: `person-${index}`,
            label: person.title,
            onClick: () => {
              //console.log("Pet chat clicked:", person);
            },
          })),
        },
      ],
    },
  ];

  // 로그아웃 버튼
  function handleLogout() {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      icon: "warning",
      title: "정말로 로그아웃 하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "다음에 만나요",
          icon: "success",
        }).then(() => {
          try {
            api.get("/auth/logout");
            dispatch(
              setTokenList({
                token: {
                  name: "",
                  userid: "",
                  id: "",
                  premium: 0,
                },
              })
            ); // redux 초기화
            router.push("/");
          } catch (error) {
            console.error("Logout failed:", error);
          }
        });
      }
    });
  }

  //다크모드 설정
  const onChange = (e: string) => {
    dispatch(setTheme(e as "light" | "dark"));
  };

  //채팅방목록 클릭 이벤트
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <DrawerStyled className={clsx("main-wrap")}>
      <div className="mypage-router-menu">
        <ConfigProvider theme={theme}>
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
            className="menu"
          />
        </ConfigProvider>
      </div>
      <div className="main-bottom">
        <Button className="main-logout" onClick={handleLogout}>
          로그아웃
        </Button>
        <div className="dark-mode">
          <Segmented
            shape="round"
            options={[
              { value: "light", icon: <SunOutlined /> },
              { value: "dark", icon: <MoonOutlined /> },
            ]}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
      </div>
    </DrawerStyled>
  );
};

export default DrawerContainer;
