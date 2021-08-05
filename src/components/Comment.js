import styles from "./Comment.module.css";
const Comment = (props) => {
  return (
    <li className={styles.commentCont}>
      <div className={styles.name}>{props.username}</div>
      <div className={styles.comment}>{props.comment}</div>
    </li>
  );
};
export default Comment;
