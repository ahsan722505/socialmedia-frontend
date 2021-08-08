import styles from "./Markup.module.css";
import React from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
  border-color: rgba(76, 0, 130, 0.815);

  z-index: 100;
`;
const color = "#ffffff";

const Markup = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [showAddPost, setAddPost] = useState(true);
  const [content, setContent] = useState("");
  const changeContentHandler = (event) => {
    setContent(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const addPost = async () => {
      setLoading(true);
      setAddPost(false);
      const response = await fetch(
        "https://polar-mountain-47234.herokuapp.com/api/addPost",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
          },
          body: JSON.stringify({
            content: content,
          }),
        }
      );
      const data = await response.json();
      if (data.posted == true) {
        setLoading(false);
        setAddPost(true);
        props.onClose();
        props.onAgainRequest();
      }
    };
    addPost();
  };
  const formInvalid = content.trim().length === 0;

  return (
    <React.Fragment>
      {showAddPost && (
        <React.Fragment>
          <div className={styles.desc}>
            <h3>Write Your Post</h3>
          </div>
          <form className={styles.form} onSubmit={submitHandler}>
            <textarea
              rows="8"
              cols="50"
              onChange={changeContentHandler}
            ></textarea>
            <button disabled={formInvalid}>Post</button>
          </form>
        </React.Fragment>
      )}
      {isLoading && (
        <div className={styles.loadCont}>
          <ClipLoader
            color={color}
            loading={isLoading}
            css={override}
            size={50}
          />
        </div>
      )}
    </React.Fragment>
  );
};
export default Markup;
