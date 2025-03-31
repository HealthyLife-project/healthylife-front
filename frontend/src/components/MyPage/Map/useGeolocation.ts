import { useState, useEffect } from "react";
import { Latlng } from "../shared/types/map";

const useGeolocation = () => {
  const [location, setLocation] = useState<Latlng | null>(null); // 현재 위치를 저장할 상태

  return { location };
};

export default useGeolocation;
