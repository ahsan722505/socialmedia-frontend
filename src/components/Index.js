import React from "react";
import styles from "./Index.module.css";
const Index = (props) => {
  return (
    <React.Fragment>
      <div className={styles.btnCont}>
        <button className={styles.btn1}>Login</button>
        <p>or</p>
        <button className={styles.btn2}>Sign Up</button>
      </div>
    </React.Fragment>
  );
};
export default Index;
