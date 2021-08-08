import React from "react";
import styles from "./Header.module.css";
import Markup from "./Markup";
import Modal from "./Modal";
import { useState } from "react";
const Header = (props) => {
  const [showMarkup, setShowMarkup] = useState(false);
  const closeMarkupHandler = () => {
    setShowMarkup(false);
  };
  const showMarkupHandler = () => {
    setShowMarkup(true);
  };
  return (
    <React.Fragment>
      <header className={styles.header}>
        <button className={styles.btn} onClick={props.onLogOut}>
          Log out
        </button>
        <div className={styles.user}>Logged In as {props.user}</div>
      </header>
      <div className={styles.btnCont}>
        <button className={styles.btn} onClick={showMarkupHandler}>
          Create Post
        </button>
      </div>
      {showMarkup && (
        <Modal onClose={closeMarkupHandler}>
          <Markup
            onClose={closeMarkupHandler}
            onAgainRequest={props.onAgainRequest}
          />
        </Modal>
      )}
    </React.Fragment>
  );
};
export default Header;
