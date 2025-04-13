import { RootState } from "@/redux/store";
import { ChartStyled } from "./styled";
import { Line } from "@ant-design/plots";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "@/util/chek";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import clsx from "clsx";

// mypage > Chart 컴포넌트
const Chart = () => {
  const tokenList = useSelector((state: RootState) => state.token.tokenList);

  const [id, setId] = useState(tokenList.id);
  const [value, setValue] = useState(1); // 1: 체중, 2: 골격근량, 3: 체지방량, 4: BMI, 5: 체지방률
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setId(tokenList.id);
  }, [tokenList.id]);

  useEffect(() => {
    api
      .get(`/inbody/userinfo/${Number(id)}`)
      .then((res) => {
        //console.log("inbody res", res.data);
        const data = res.data;

        const newChartData = data.map((item: any) => ({
          date: item.createdAt.slice(5, 10), // "04-10"
          weight: parseFloat(item.weight),
          musclemass: parseFloat(item.muscleMass),
          fatmass: parseFloat(item.bodyFat),
          bmi: parseFloat(item.bmi),
          fatper: parseFloat(item.bodyFatPer),
        }));

        setChartData(newChartData);
      })
      .catch((error: string) => {
        console.log("유저 인바디 정보 가져오기 실패", error);
      });
  }, [id]);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  // 선택된 항목에 따라 필터링된 데이터 생성
  const selectedData = chartData.map((item: any) => ({
    Date: item.date,
    value:
      value === 1
        ? item.weight
        : value === 2
        ? item.musclemass
        : value === 3
        ? item.fatmass
        : value === 4
        ? item.bmi
        : item.fatper,
  }));

  // 차트 config
  const config = {
    data: selectedData,
    xField: "Date",
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
    <ChartStyled className={clsx("main-wrap")}>
      <div className="chart">
        <Line {...config} />
      </div>
      <div className="attribute">
        <Radio.Group
          onChange={onChange}
          value={value}
          options={[
            { value: 1, label: "체중" },
            { value: 2, label: "골격근량" },
            { value: 3, label: "체지방량" },
            { value: 4, label: "BMI" },
            { value: 5, label: "체지방률" },
          ]}
        />
      </div>
    </ChartStyled>
  );
};

export default Chart;
