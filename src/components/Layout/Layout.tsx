import style from "./Layout.module.scss";
import React from "react";

export const Layout = ({
  children,
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
}) => {
  return <div className={style.wrapper}>{children}</div>;
};
