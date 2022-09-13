import React, { FC, ReactNode } from "react";
import styles from "./title.module.css";

interface ITitleProps {
  children: ReactNode;
}

const Title: FC<ITitleProps> = ({ children }) => {
  return (
    <h1 className={`${styles.title} text text_type_main-large pt-10 pb-5`}>
      {children}
    </h1>
  );
};

export default Title;
