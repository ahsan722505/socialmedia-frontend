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

  return (
    <li className={styles.post}>
      <div className={styles.userCont}>
        <h3 className={styles.username}>{props.username}</h3>
      </div>
      <p className={styles.content}>{props.content}</p>
      <div className={styles.facts}>
        <button onClick={showLikesHandler}>2 likes</button>
        <button>2 comments</button>
      </div>
      <div className={styles.vectors}>
        <div>
          <button>
            <i class="far fa-thumbs-up iconic"></i>
            <span> Like</span>
          </button>
        </div>

        {/* <i class="fas fa-thumbs-up"></i> */}
        <button onClick={showCommentsHandler}>
          <span className={styles.comments}>comments</span>
        </button>
      </div>
      <form className={styles.form}>
        <input type="text" placeholder="Write a comment" />
        <div className={styles.btnCont}>
          <button>Post</button>
        </div>
      </form>
      {showComments && (
        <Modal onClose={closeCommentsHandler}>
          <Comments comments={props.comments} />
        </Modal>
      )}
      {showLikes && (
        <Modal onClose={closeLikesHandler}>
          <Likes likes={props.likes} />
        </Modal>
      )}
    </li>
  );
};
export default Post;
