import React from "react";
import styles from "./constructor-item.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

const ConstructorItem = (props) => {
  const { element, handleDelete } = props;

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: element,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <>
      <li className={styles.ingredients_item} ref={dragRef}>
        <DragIcon type={"primary"} />
        <ConstructorElement
          text={element.name}
          thumbnail={element.image}
          price={element.price}
          handleClose={() => handleDelete(element.id)}
        />
      </li>
    </>
  );
};

export default ConstructorItem;
