import React, { FC } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  handleClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ handleClose }): JSX.Element => {
  return <div className={styles.modal_overlay} onClick={handleClose} />;
};

export default ModalOverlay;
