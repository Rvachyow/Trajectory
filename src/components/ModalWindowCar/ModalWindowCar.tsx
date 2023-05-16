import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import style from "./ModalWindowCar.module.scss";
import { useAppDispatch } from "../../redux/hook";
import { createCarList } from "../../redux/slices/carsSlice";

const portal = document.getElementById("portal") as HTMLElement;
export const ModalWindowCar = ({
  activeModal,
  setActiveModal,
}: {
  activeModal: boolean;
  setActiveModal: (arg: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      id: "",
      name: "",
      model: "",
      year: "",
      color: "",
      price: "",
    },
    mode: "onChange",
  });

  const onSubmit = (value: any) => {
    dispatch(createCarList({ value }));
    reset();
    closeModal();
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  if (!activeModal) return null;

  return ReactDOM.createPortal(
    <div className={style.modal}>
      <div onClick={closeModal} className={style.bg}></div>
      <div className={style.modal_container}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.newConctact}>
          <input
            type="number"
            {...register("id", { required: "id" })}
            placeholder="id"
          />
          <input
            autoComplete="off"
            {...register("name", { required: "name" })}
            placeholder="name"
            type="text"
          />
          <input
            autoComplete="off"
            {...register("model", { required: "model" })}
            placeholder="model"
            type="text"
          />
          <input
            autoComplete="off"
            {...register("year", { required: "year" })}
            placeholder="year"
            type="text"
          />
          <input
            autoComplete="off"
            {...register("color", { required: "color" })}
            placeholder="color"
            type="text"
          />
          <input
            autoComplete="off"
            {...register("price", { required: "price" })}
            placeholder="price"
            type="text"
          />
          <div className={style.btn}></div>
          <div className={style.line}></div>
          <button disabled={!formState.isValid} className={style.createbtn}>
            Creat
          </button>
        </form>
      </div>
    </div>,
    portal,
  );
};
