import styles from "./Comments.module.css";
import Comment from "./Comment";
const Comments = (props) => {
  const publicComments = props.comments.map((comment) => {
    return <Comment username={comment.username} comment={comment.comment} />;
  });
  return <ul className={styles.comments}>{publicComments}</ul>;
};
export default Comments;
