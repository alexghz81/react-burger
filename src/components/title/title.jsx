import React from "react";
import styles from "./title.module.css";

const Title = (props) => {
  return (
    <h1 className={`${styles.title} text text_type_main-large pt-10 pb-5`}>
      {props.children}
    </h1>
  );
};

export default Title;