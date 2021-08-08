import React from "react";
import styles from "./Index.module.css";
const Index = (props) => {
  return (
    <React.Fragment>
      <div className={styles.marketCont}>
        <p>Welcome to Ahsan Media</p>
      </div>
      <div className={styles.btnCont}>
        <button className={styles.btn1} onClick={props.onShowLogin}>
          Login
        </button>
        <p>or</p>
        <button className={styles.btn2} onClick={props.onShowSignUp}>
          Sign Up
        </button>
      </div>
    </React.Fragment>
  );
};
export default Index;
