import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#react-modals");

export default function Modal({ title, children, handleClose }) {
  const handleEsc = (e) => {
    if (e.key === "Escape") handleClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => removeEventListener("keydown", handleEsc);
  });

  return ReactDOM.createPortal(
    <>
      <ModalOverlay handleClose={handleClose} />
      <div className={`${styles.modal} p-10 pb-15`}>
        <div className={`${styles.modal_title_wrapper}`}>
          <h3
            className={`${styles.modal_title} text text_type_main-large pr-15`}
          >
            {title}
          </h3>
          <CloseIcon onClick={handleClose} type="primary" />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
});
