import styles from "./Login.module.css";
import React from "react";
const Login = (props) => {
  return (
    <React.Fragment>
      <form className={styles.form}>
        <input type="text" placeholder="username or email" />
        <input type="password" placeholder="password" />
        <button>Login</button>
        <div className={styles.helpCont}>
          <p className={styles.help}>
            Not have an account? <button>Sign Up</button>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
};
export default Login;
