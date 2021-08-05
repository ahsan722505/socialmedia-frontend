import Post from "./Post";
import styles from "./Posts.module.css";

const Posts = (props) => {
  const intPosts = props.posts.map((post) => {
    return (
      <Post
        username={post.username}
        content={post.content}
        comments={post.comments}
        likes={post.likes}
      ></Post>
    );
  });
  return <ul className={styles.posts}>{intPosts}</ul>;
};
export default Posts;
