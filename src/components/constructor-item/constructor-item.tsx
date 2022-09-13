import React, { FC, useRef } from "react";
import styles from "./constructor-item.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { IConstructorIngredient } from "../../services/reducers/constructor-slice";

interface IConstructorItem {
  element: IConstructorIngredient;
  handleDelete: Function;
  findIngredient: Function;
  reorderIngredient: Function;
}

const ConstructorItem: FC<IConstructorItem> = ({
  element,
  handleDelete,
  findIngredient,
  reorderIngredient,
}): JSX.Element => {
  const ref = useRef<HTMLLIElement>(null);
  const id = element.id;
  const ingredientIndex: number = findIngredient(id).index;
  const [, drag] = useDrag(
    {
      type: "dragIngredient",
      item: { id, ingredientIndex },
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    },
    [id, ingredientIndex]
  );

  const [, drop] = useDrop(
    {
      accept: "dragIngredient",
      canDrop: () => false,
      hover: ({ id: dragId }: { id: string }) => {
        if (dragId !== id) {
          const { index: overIndex } = findIngredient(id);
          reorderIngredient(dragId, overIndex);
        }
      },
    },
    [findIngredient, reorderIngredient]
  );

  drag(drop(ref));

  return (
    <>
      <li className={styles.ingredients_item} ref={ref}>
        <DragIcon type={"primary"} />
        <ConstructorElement
          text={element.name}
          thumbnail={element.image}
          price={element.price}
          handleClose={() => handleDelete(element._id)}
        />
      </li>
    </>
  );
};

export default ConstructorItem;
