import { CarsDataType } from "../../types/CarsDataType";
import { useState } from "react";
import style from "./TableItem.module.scss";
import { useAppDispatch } from "../../redux/hook";
import { deleateCarList } from "../../redux/slices/carsSlice";
import { ModalWindowRefactor } from "../ModalWindowRefactor/ModalWindowRefactor";
import { Link } from "react-router-dom";

export const TableItem = ({
  id,
  name,
  model,
  color,
  price,
  year,
  latitude,
  longitude,
}: CarsDataType) => {
  const [activeModal, setActiveModal] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useAppDispatch();

  const handleActiveModal = () => {
    setActiveModal(!activeModal);
  };

  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  const handleDeleateCar = () => {
    dispatch(deleateCarList(id));
    setMenuActive(false);
  };

  return (
    <>
      <ModalWindowRefactor
        id={id}
        name={name}
        model={model}
        color={color}
        price={price}
        year={year}
        setActiveModal={setActiveModal}
        activeModal={activeModal}
        latitude={latitude}
        longitude={longitude}
      />
      <tr onClick={handleMenuToggle} className={style.tableitem}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{model}</td>
        <td>{year}</td>
        <td>{color}</td>
        <td>{price}</td>
      </tr>
      {menuActive ? (
        <tr className={style.btns}>
          <td onClick={handleDeleateCar} className={style.delbtn}>
            Удалить
          </td>
          <td>
            <Link to={`/map/${latitude}_${longitude}_${id}`}>
              <img height={25} width={25} src="../assets/map.svg" alt="" />
            </Link>
          </td>
          <td onClick={handleActiveModal}>
            <img height={25} width={25} src="../assets/edit.svg" alt="" />
          </td>
        </tr>
      ) : null}
    </>
  );
};
