import styles from "./Post.module.css";
import Modal from "./Modal";
import Comment from "./Comment";
import Comments from "./Comments";
import { useState } from "react";
import Likes from "./Likes";

import React from "react";

const Post = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [commentPost, setCommentPost] = useState("Post");
  const [commentState, setCommentState] = useState("");
  const [brLikes, setBrLikes] = useState([...props.likes]);
  const commentHandler = (event) => {
    setCommentState(event.target.value);
  };
  const inValidComment = commentState.length === 0;
  const commentSubmitHandler = (event) => {
    event.preventDefault();
    const addComment = async () => {
      setCommentPost("posting...");
      const response = await fetch(
        "https://polar-mountain-47234.herokuapp.com/api/addComment",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
          },
          body: JSON.stringify({
            comment: commentState,
            postId: props.id,
          }),
        }
      );
      const data = await response.json();
      if (data.posted === true) {
        props.onAgainRequest();
      }
    };
    addComment();
  };

  const closeCommentsHandler = () => {
    setShowComments(false);
  };
  const closeLikesHandler = () => {
    setShowLikes(false);
  };

  const showCommentsHandler = () => {
    setShowComments(true);
  };
  const showLikesHandler = () => {
    setShowLikes(true);
  };

  const addLikeHandler = () => {
    let newLikes;
    if (brLikes.includes(props.user)) {
      const removeLike = async () => {
        const response = await fetch(
          "https://polar-mountain-47234.herokuapp.com/api/removeLike",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("Authorization"),
            },
            body: JSON.stringify({
              postId: props.id,
            }),
          }
        );
      };
      removeLike();
      newLikes = brLikes.filter((like) => like !== props.user);
      setBrLikes(newLikes);
    } else {
      const addLike = async () => {
        const response = await fetch(
          "https://polar-mountain-47234.herokuapp.com/api/addLike",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("Authorization"),
            },
            body: JSON.stringify({
              postId: props.id,
            }),
          }
        );
      };
      addLike();
      newLikes = [...brLikes, props.user];
      setBrLikes(newLikes);
    }
  };

  return (
    <li className={styles.post}>
      <div className={styles.userCont}>
        <h3 className={styles.username}>{props.username}</h3>
      </div>
      <p className={styles.content}>{props.content}</p>
      <div className={styles.facts}>
        <button onClick={showLikesHandler}>{brLikes.length} likes</button>
        <button>{props.comments.length} comments</button>
      </div>
      <div className={styles.vectors}>
        <div>
          <button onClick={addLikeHandler}>
            {brLikes.includes(props.user) ? (
              <i class="fas fa-thumbs-up"></i>
            ) : (
              <i class="far fa-thumbs-up iconic"></i>
            )}
            <span> Like</span>
          </button>
        </div>

        <button onClick={showCommentsHandler}>
          <span className={styles.comments}>comments</span>
        </button>
      </div>
      <form className={styles.form} onSubmit={commentSubmitHandler}>
        <input
          type="text"
          placeholder="Write a comment"
          onChange={commentHandler}
        />
        <div className={styles.btnCont}>
          <button className={styles.submitCommentBtn} disabled={inValidComment}>
            {commentPost}
          </button>
        </div>
      </form>
      {showComments && (
        <Modal onClose={closeCommentsHandler}>
          <Comments comments={props.comments} />
        </Modal>
      )}
      {showLikes && (
        <Modal onClose={closeLikesHandler}>
          <Likes likes={brLikes} />
        </Modal>
      )}
    </li>
  );
};
export default Post;
