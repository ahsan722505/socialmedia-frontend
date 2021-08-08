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
const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [emailTouch, setEmailTouch] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const [user, setUser] = useState("");
  const [userTouch, setUserTouch] = useState(false);

  const [pass, setPass] = useState("");
  const [passTouch, setPassTouch] = useState(false);

  const [conPass, setConPass] = useState("");
  const [conPassTouch, setConPassTouch] = useState(false);
  const [conPassValid, setConPassValid] = useState(true);
  const [emailExist, setEmailExist] = useState(false);
  const [usernameExist, setusernameExist] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showContent, setcontent] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setEmailValid((email.includes("@") && emailTouch) || !emailTouch);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [email, emailTouch]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setConPassValid((conPass === pass && conPassTouch) || !conPassTouch);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [conPass, conPassTouch, pass]);

  const userValid = (validity(user) && userTouch) || !userTouch;
  const passValid = (validity(pass) && passTouch) || !passTouch;

  const emailChangeHandler = (event) => {
    setEmailExist(false);
    setEmailTouch(true);
    setEmail(event.target.value);
    if (event.target.value.includes("@")) {
      setEmailValid(true);
    }
  };
  const userChangeHandler = (event) => {
    setusernameExist(false);
    setUserTouch(true);
    setUser(event.target.value);
  };
  const passChangeHandler = (event) => {
    setPassTouch(true);
    setPass(event.target.value);
  };
  const conPassChangeHandler = (event) => {
    setConPassTouch(true);
    setConPass(event.target.value);
    if (event.target.value === pass) {
      setConPassValid(true);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (
      email.includes("@") &&
      validity(user) &&
      validity(pass) &&
      pass === conPass
    ) {
      const addUser = async () => {
        setLoading(true);
        setcontent(false);
        const response = await fetch(
          "https://polar-mountain-47234.herokuapp.com/api/signup",
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              username: user.trim(),
              email: email.trim(),
              password: pass,
            }),
          }
        );
        const data = await response.json();
        setLoading(false);
        setcontent(true);
        const { accessToken } = data;
        if (accessToken) {
          localStorage.setItem("Authorization", `Bearer ${accessToken}`);
        }
        const { ok, emailExist, usernameExist } = data;

        if (emailExist) {
          setEmailExist(true);
        }
        if (usernameExist) {
          setusernameExist(true);
        } else if (!emailExist && !usernameExist) {
          // props.onSetUser(user.trim());
          // props.onShowMain();
          props.onAgainRequest();
        }
      };
      addUser();
    }
  };
  const formValid =
    email.includes("@") && validity(user) && validity(pass) && pass === conPass;
  const content = (
    <div className={styles.formCont}>
      <form className={styles.form} onSubmit={submitHandler}>
        <input
          onChange={emailChangeHandler}
          value={email}
          type="email"
          placeholder="email"
          className={!emailValid || emailExist ? `${styles.inValid}` : ""}
        />
        {!emailValid && (
          <p className={styles.pInvalid}>Email should contain "@"</p>
        )}
        {emailExist && <p className={styles.pInvalid}>email already exists.</p>}
        <input
          onChange={userChangeHandler}
          value={user}
          type="text"
          placeholder="username"
          className={!userValid || usernameExist ? `${styles.inValid}` : ""}
        />
        {!userValid && (
          <p className={styles.pInvalid}>username should not be empty</p>
        )}
        {usernameExist && (
          <p className={styles.pInvalid}>username already exists.</p>
        )}
        <input
          onChange={passChangeHandler}
          value={pass}
          type="password"
          placeholder="password"
          className={!passValid ? `${styles.inValid}` : ""}
        />
        {!passValid && (
          <p className={styles.pInvalid}>password should not be empty</p>
        )}
        <input
          onChange={conPassChangeHandler}
          value={conPass}
          type="password"
          placeholder="confirm password"
          className={!conPassValid ? `${styles.inValid}` : ""}
        />
        {!conPassValid && (
          <p className={styles.pInvalid}>
            Password and confirm password fields should be same.
          </p>
        )}
        <button
          className={styles.submitBtn}
          type="submit"
          disabled={!formValid}
        >
          Sign Up
        </button>
        <div className={styles.helpCont}>
          <p className={styles.help}>
            Already have an account?{" "}
            <button type="button" onClick={props.onShowLogin}>
              Login
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
export default SignUp;
