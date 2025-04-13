import styled from "styled-components";

export const MapStyle = styled.div`
  &.main-wrap {
    width: 100%;
    height: 100%; /* 지도 높이 설정 */
    display: flex;
    justify-content: center;
    align-items: center;

    #map {
      width: 100%;
      height: 100%;
    }
  }
`;
