import { RootState } from "@/redux/store";
import { ChartStyled } from "./styled";
import { Line } from "@ant-design/plots";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "@/util/chek";

//SubMain > Chart 컴포넌트
const Chart = () => {
  //변수 선언
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수
  //console.log("tokenList", tokenList.id);

  //useState
  const [id, setId] = useState();

  //useEffect
  useEffect(() => {
    setId(tokenList.id);
    api
      .get(`/inbody/userinfo/${id}`)
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((error: string) => {
        console.log("유저 인바디 정보 가져오기 실패", error);
      });
  }, []);

  //백엔드에서 id에 따른 인바디 정보 가져오기
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  //행과 열 설정
  const config = {
    data,
    xField: "year",
    yField: "value",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return (
    <ChartStyled>
      <Line {...config} />
    </ChartStyled>
  );
};

export default Chart;
