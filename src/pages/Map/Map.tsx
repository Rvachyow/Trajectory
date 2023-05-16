import style from "./Map.module.scss";
import { YandexMap } from "../../components/YandexMap/YandexMap";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCars } from "../../redux/slices/carsSlice";

export const Map = () => {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState<number>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getCars());
  }, [id]);

  useEffect(() => {
    if (!id) return;
    let [lat, log, curId] = id?.split("_");
    setCurrentId(parseInt(curId, 10));
  }, [id]);

  const data = useAppSelector((state) => state.cars.filtered);
  const findData = data.find((item) => item.id === currentId);

  return (
    <div className={style.map}>
      <div className={style.container}>
        <YandexMap />
        <div className={style.map__text}>
          <ul>
            <li>name: {findData?.name}</li>
            <li>color: {findData?.color}</li>
            <li>model: {findData?.model}</li>
            <li>price: {findData?.price}</li>
            <li>year: {findData?.year}</li>
          </ul>
        </div>
        <button onClick={handleBackBtn} className={style.back}>
          back
        </button>
      </div>
    </div>
  );
};
