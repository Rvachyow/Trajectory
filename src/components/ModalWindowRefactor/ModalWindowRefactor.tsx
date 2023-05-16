import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import style from "./ModalWindowRefactor.module.scss";
import { useAppDispatch } from "../../redux/hook";
import { CarsDataType } from "../../types/CarsDataType";
import { editCarList } from "../../redux/slices/carsSlice";

const portal = document.getElementById("portal") as HTMLElement;
export const ModalWindowRefactor = ({
  activeModal,
  setActiveModal,
  id,
  name,
  model,
  year,
  color,
  price,
  longitude,
  latitude,
}: CarsDataType & {
  activeModal: boolean;
  setActiveModal: (arg: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      name: name,
      model: model,
      year: year,
      color: color,
      price: price,
      longitude: longitude,
      latitude: latitude,
    },
    mode: "onChange",
  });

  const onSubmit = (value: any) => {
    dispatch(editCarList({id:id, value:value}));
    reset();
    closeModal()
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
          <input
            autoComplete="off"
            {...register("longitude", { required: "longitude" })}
            placeholder="longitude"
            type="text"
          />
          <input
            autoComplete="off"
            {...register("latitude", { required: "latitude" })}
            placeholder="latitude"
            type="text"
          />
          <div className={style.btn}></div>
          <div className={style.line}></div>
          <button disabled={!formState.isValid} className={style.createbtn}>
            Save edit
          </button>
        </form>
      </div>
    </div>,
    portal,
  );
};
