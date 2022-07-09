import React, { useRef } from "react";
import styles from "./constructor-item.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

const ConstructorItem = ({
  element,
  handleDelete,
  findIngredient,
  reorderIngredient,
}) => {
  const ref = useRef();
  const id = element.id;
  const ingredientIndex = findIngredient(id).index;
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
      hover: ({ id: dragId }) => {
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
          handleClose={() => handleDelete(element.id)}
        />
      </li>
    </>
  );
};

ConstructorItem.propTypes = {
  element: ingredientPropType,
  handleDelete: PropTypes.func.isRequired,
  findIngredient: PropTypes.func.isRequired,
  reorderIngredient: PropTypes.func.isRequired,
}.isRequired;

export default ConstructorItem;
