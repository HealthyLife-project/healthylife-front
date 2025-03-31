import { useEffect } from "react";
import { MapStyle } from "./styled"; //스타일
import clsx from "clsx";
import { Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKaKaoLoader";

//Component
// declare global {
//   interface Window {
//     kakao: any;
//   }
// }
// const key = process.env.REACT_APP_KAKAO_KEY;

//마이페이지 > 운동정보 지도 컴포넌트
const KAKAOMap = () => {
  // useEffect(() => {
  //   let container = document.getElementById(`map`); // 지도를 담을 영역의 DOM 레퍼런스
  //   let options = {
  //     center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
  //     level: 3, // 지도의 레벨(확대, 축소 정도)
  //   };

  //   let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  // }, []);
  useKakaoLoader();
  return (
    <MapStyle className={clsx("main-wrap")}>
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "1000px", height: "600px" }}
        level={3}
      />
    </MapStyle>
  );
};

export default KAKAOMap;
