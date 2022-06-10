import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ handleClose }) {
  return <div className={styles.modal_overlay} onClick={handleClose} />;
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
