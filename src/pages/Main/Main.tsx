import style from "./Main.module.scss";
import { useAppDispatch } from "../../redux/hook";
import { useEffect } from "react";
import { getCars } from "../../redux/slices/carsSlice";
import { Tables } from "../../components/Tables/Tables";

export const Main = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  return (
    <div className={style.main}>
      <Tables />
    </div>
  );
};
