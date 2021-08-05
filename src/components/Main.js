import styles from "./Main.module.css";
import React from "react";
import Header from "./Header";
import Posts from "./Posts";
const Main = (props) => {
  return (
    <React.Fragment>
      <Header user={props.user} />
      <Posts posts={props.posts} />
    </React.Fragment>
  );
};
export default Main;
