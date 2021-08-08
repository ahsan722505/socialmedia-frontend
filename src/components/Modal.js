import { Fragment } from "react";
import styles from "./Modal.module.css";
import ReactDom from "react-dom";
import { Scrollbars } from "react-custom-scrollbars";

const BackDrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick} />;
};
const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.close}>
        <button onClick={props.onClick}>x</button>
      </div>
      <Scrollbars style={{ height: 300 }}>
        <div className={styles.content}>{props.children}</div>
      </Scrollbars>
    </div>
  );
};
const portalElement = document.getElementById("overlays");
let changeContent;
let changeLoading;
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <BackDrop onClick={props.onClose} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay onClick={props.onClose}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};
export default Modal;
