import styles from "./Markup.module.css";
import React from "react";
const Markup = () => {
  return (
    <React.Fragment>
      <div className={styles.desc}>
        <h3>Write Your Post</h3>
      </div>
      <form className={styles.form}>
        <textarea rows="8" cols="50"></textarea>
        <button>Post</button>
      </form>
    </React.Fragment>
  );
};
export default Markup;
