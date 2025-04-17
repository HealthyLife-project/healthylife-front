import { useEffect, useRef, useState } from "react";
import { MapStyle } from "./styled";
import clsx from "clsx";
import api from "@/util/chek";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

declare global {
  interface Window {
    kakao: any;
  }
}

const KAKAOMap = (props: { position: string }) => {
  const { position } = props;
  const tokenList = useSelector((state: RootState) => state.token.tokenList);

  const mapRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.addEventListener("load", () => {
      window.kakao.maps.load(async () => {
        let lat: number, lng: number;

        try {
          if (position === "mypage") {
            const user = await api.get(`/user/${tokenList?.id}`);
            const address = user.data.address;

            const transe_address = await api.post(`/maps/find`, { address });
            lat = transe_address.data.latitude;
            lng = transe_address.data.longitude;
          } else {
            const pos = await new Promise<GeolocationPosition>(
              (resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
          }

          //  지도 생성
          const mapContainer = document.getElementById("map");
          const mapOption = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 5,
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);
          mapRef.current = map;

          // 현재 위치 마커
          new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(lat, lng),
            title: "현재 위치",
          });

          // 공통 InfoWindow
          const infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
          infoWindowRef.current = infoWindow;

          // 위치 기반 장소 요청
          const res = await api.post("/maps/search", {
            lat: lat,
            lng: lng,
          });

          const data = res.data;
          setPlaces(data);

          data.forEach((place: any) => {
            const markerPosition = new window.kakao.maps.LatLng(
              place.y,
              place.x
            );

            const marker = new window.kakao.maps.Marker({
              map,
              position: markerPosition,
              title: place.place_name,
            });

            const content = `
              <div style="
                background: #ffffff;
                padding: 6px 8px;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                font-size: 12px;
                line-height: 1.6;
                color: #333;
                max-width: 240px;
                overflow : hidden;
                font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
              ">
                <div style="font-weight: 600; font-size: 15px; margin-bottom: 6px; color: #222;">
                  ${place.place_name}
                </div>
                <div style="font-size: 13px; color: #666;">
                  ${place.road_address_name || ""}
                </div>
              </div>
            `;

            const overlay = new window.kakao.maps.CustomOverlay({
              position: markerPosition,
              content: content,
              yAnchor: 1.6,
            });

            window.kakao.maps.event.addListener(marker, "click", () => {
              overlay.setMap(null);
              overlay.setMap(map);
            });

            window.kakao.maps.event.addListener(map, "click", () => {
              overlay.setMap(null);
            });
          });
        } catch (error) {
          console.error("지도 로딩 오류:", error);
        }
      });
    });
  }, [position, tokenList?.id]);

  return (
    <MapStyle className={clsx("main-wrap")}>
      <div id="map"></div>
    </MapStyle>
  );
};

export default KAKAOMap;
