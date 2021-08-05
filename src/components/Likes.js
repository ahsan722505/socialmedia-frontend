import styles from "./Likes.module.css";

const Likes = (props) => {
  const publicLikes = props.likes.map((like) => {
    return <li className={styles.like}>{like}</li>;
  });
  return <ul className={styles.likes}>{publicLikes}</ul>;
};
export default Likes;
