import React, { FC, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModalProps {
  children: ReactNode;
  handleClose: () => void;
}

const modalRoot: HTMLElement | null = document.querySelector("#react-modals");

const Modal: FC<IModalProps> = ({
  children,
  handleClose,
}): null | React.ReactPortal => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    modalRoot &&
    ReactDOM.createPortal(
      <>
        <ModalOverlay handleClose={handleClose} />
        <div className={`${styles.modal} p-10 pb-15`}>
          <div className={`${styles.modal_title_wrapper}`}>
            <h3
              className={`${styles.modal_title} text text_type_main-large pr-15`}
            >
              {/*{title}*/}
            </h3>
            <CloseIcon onClick={handleClose} type="primary" />
          </div>
          {children}
        </div>
      </>,
      modalRoot
    )
  );
};

export default Modal;
