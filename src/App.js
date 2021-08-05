import Main from "./components/Main";
import Login from "./components/Login";
import Index from "./components/Index";
import SignUp from "./components/SignUp";
import React from "react";
import { useState } from "react";
const user = { id: "bdhys", username: "ahsan88" };
const posts = [
  {
    username: "ahsan88",
    id: "diusi",
    content:
      "Hello I am ahsan and I am a good man.hhhfdfnfjnfdnfjdnfojfnefnbfuefbuebfuebfbefbjbfjabfahbfhabfhafhabfakbfabfakbfjabfjabfjbfjdbfdj",
    likes: [
      "ali",
      "ahsan",
      "jav",
      "ali",
      "ahsan",
      "jav",
      "ali",
      "ahsan",
      "jav",
      "ali",
      "ahsan",
      "jav",
      "ali",
      "ahsan",
      "jav",
    ],
    comments: [
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      { username: "jav", comment: "noice" },
      {
        username: "jav",
        comment:
          "noicejfjefiejfipefnfidnfifniegniegneigneibgebgeigbeigbiebgiebgeigbegbeigbeib",
      },
    ],
  },
  {
    username: "ahsan88",
    id: "diusi",
    content: "Hello I am ahsan and I am a good man.",
    likes: ["ali", "ahsan", "jav"],
    comments: [{ username: "jav", comment: "noice" }],
  },
  {
    username: "ahsan88",
    id: "diusi",
    content: "Hello I am ahsan and I am a good man.",
    likes: ["ali", "ahsan", "jav"],
    comments: [{ username: "jav", comment: "noice" }],
  },
];
const App = () => {
  const [showSignUp, setShowSignUp] = useState(true);
  const [showMain, setShowMain] = useState(false);
  const showMainHandler = () => {
    setShowMain(true);
    setShowSignUp(false);
  };
  const closeMainHandler = () => {
    setShowMain(false);
    setShowSignUp(true);
  };
  return (
    <React.Fragment>
      {showMain && <Main user={user} posts={posts} />}
      {/* <Index /> */}
      {/* <Login /> */}
      {showSignUp && <SignUp onShowMain={showMainHandler} />}
    </React.Fragment>
  );
};
export default App;
