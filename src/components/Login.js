import styles from "./SignUp.module.css";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
  border-color: rgb(40, 207, 40);
  position: fixed;
  top: 40vh;

  left: 45vw;
`;
const color = "#ffffff";
const validity = (value) => {
  return value.trim().length !== 0;
};
const Login = (props) => {
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const [inValidCred, setInValidCred] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [showContent, setcontent] = useState(true);
  const emailOrUserChangeHandler = (event) => {
    setInValidCred(false);
    setEmailOrUser(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setInValidCred(false);
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const auth = async () => {
      console.log("sending gig");
      setcontent(false);
      setLoading(true);
      const response = await fetch(
        "https://polar-mountain-47234.herokuapp.com/api/login",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            emailOrUser: emailOrUser.trim(),
            password: password,
          }),
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      const { accessToken } = data;
      if (accessToken) {
        localStorage.setItem("Authorization", `Bearer ${accessToken}`);
      }
      setLoading(false);
      setcontent(true);
      if (data.ok) {
        // props.onSetUser(data.username);
        // props.onShowMain();
        console.log("ready to send..");
        props.onAgainRequest();
      } else {
        setInValidCred(true);
      }
    };
    auth();
  };
  const formValid = validity(emailOrUser) && validity(password);

  const content = (
    <div className={styles.formCont}>
      <form className={styles.form} onSubmit={submitHandler}>
        <input
          onChange={emailOrUserChangeHandler}
          value={emailOrUser}
          type="text"
          placeholder="username or email"
          className={inValidCred ? `${styles.inValid}` : ""}
        />

        <input
          onChange={passwordChangeHandler}
          value={password}
          type="password"
          placeholder="password"
          className={inValidCred ? `${styles.inValid}` : ""}
        />
        {inValidCred && <p className={styles.pInvalid}>Invalid Credentials.</p>}

        <button
          className={styles.submitBtn}
          type="submit"
          disabled={!formValid}
        >
          Login
        </button>
        <div className={styles.helpCont}>
          <p className={styles.help}>
            Don't have an account?{" "}
            <button type="button" onClick={props.onShowSignUp}>
              SignUp
            </button>
          </p>
        </div>
      </form>
    </div>
  );
  return (
    <React.Fragment>
      {showContent && content}
      {isLoading && (
        <ClipLoader
          color={color}
          loading={isLoading}
          css={override}
          size={50}
        />
      )}
    </React.Fragment>
  );
};
export default Login;
