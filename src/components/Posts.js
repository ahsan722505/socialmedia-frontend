import Post from "./Post";
import styles from "./Posts.module.css";

const Posts = (props) => {
  const intPosts = props.posts.map((post) => {
    return (
      <Post
        id={post.id}
        username={post.username}
        content={post.content}
        comments={post.comments}
        likes={post.likes}
        onAgainRequest={props.onAgainRequest}
        user={props.user}
      ></Post>
    );
  });
  return <ul className={styles.posts}>{intPosts}</ul>;
};
export default Posts;
