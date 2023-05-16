import style from "./ButtonNewCar.module.scss";
import { ModalWindowCar } from "../ModalWindowCar/ModalWindowCar";
import { useState } from "react";

export const ButtonNewCar = () => {
  const [activeModal, setActiveModal] = useState(false);
  const handleActiveModal = () => {
    setActiveModal(!activeModal);
  };

  return (
    <>
      {activeModal ? (
        <ModalWindowCar
          setActiveModal={setActiveModal}
          activeModal={activeModal}
        />
      ) : null}
      <button onClick={handleActiveModal} className={style.addlist}>
        AddCar
      </button>
    </>
  );
};
