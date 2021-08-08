import styles from "./Main.module.css";
import React from "react";
import Header from "./Header";
import Posts from "./Posts";
const Main = (props) => {
  return (
    <React.Fragment>
      <Header
        user={props.user}
        onLogOut={props.onLogOut}
        onAgainRequest={props.onAgainRequest}
      />
      <Posts
        posts={props.posts}
        onAgainRequest={props.onAgainRequest}
        user={props.user}
      />
    </React.Fragment>
  );
};
export default Main;
