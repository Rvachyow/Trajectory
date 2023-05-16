import style from "./Tables.module.scss";
import { TableItem } from "../TableItem/TableItem";
import { useAppSelector } from "../../redux/hook";
import { CarsDataType } from "../../types/CarsDataType";
import { ButtonSortData } from "../ButtonSortData/ButtonSortData";
import { SORT_BTN } from "../../constants/btnConstant";
import { useState } from "react";
import { ButtonNewCar } from "../ButtonNewCar/ButtonNewCar";

export const Tables = () => {
  const [targetFilter, setTargetFilter] = useState<keyof CarsDataType>("id");
  const { filtered, status } = useAppSelector((state) => state.cars);

  return (
    <div className={style.tables}>
      <div className={style.container}>
        <div className={style.btnCreat}>
          <ButtonNewCar />
        </div>
        {status === "loading" ? (
          <div>loading</div>
        ) : (
          <div className={style.tables__table}>
            <table>
              <thead>
                <tr className={style.table__tr}>
                  {SORT_BTN?.map((item) => (
                    <ButtonSortData
                      key={item.path}
                      active={targetFilter === item.name}
                      setTargetFilter={setTargetFilter}
                      {...item}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered?.map((item: CarsDataType) => (
                  <TableItem {...item} key={item.id} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
