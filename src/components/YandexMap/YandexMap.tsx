import style from "./YandexMap.module.scss";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const YandexMap = () => {
  const [latitude, setLatitude] = useState(55.66076);
  const [longitude, setLongitude] = useState(37.54356);

  let { id } = useParams();
  useEffect(() => {
    if (!id) return; 
    let [lat, log] = id?.split("_");
    setLatitude(parseInt(lat, 10));
    setLongitude(parseInt(log, 10));
  }, [id]);

  return (
    <div className={style.maps}>
      <YMaps>
        <Map
          width={"100%"}
          height={"100%"}
          className={style.map}
          defaultState={{
            center: [latitude, longitude],
            zoom: 9,
          }}
        >
          <Placemark geometry={[latitude, longitude]} />
        </Map>
      </YMaps>
    </div>
  );
};
