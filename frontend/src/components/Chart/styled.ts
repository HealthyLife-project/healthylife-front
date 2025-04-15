import styled from "styled-components";

export const ChartStyled = styled.div`
  &.main-wrap {
    display: flex;
    width: 100%;
    height: 100%;

    .chart {
      width: 80%;
      height: 100%;
    }

    .attribute {
      display: flex;
      flex-direction: column;
      width: 20%;
      height: 100%;
      align-items: center;
      margin: auto 0px;
    }

    .attribute .ant-radio-group {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
`;
