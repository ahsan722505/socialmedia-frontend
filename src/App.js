import Main from "./components/Main";
import Login from "./components/Login";
import Index from "./components/Index";
import SignUp from "./components/SignUp";
import React, { useEffect } from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
  border-color: rgb(40, 207, 40);
  position: fixed;
  top: 40vh;

  left: 45vw;
`;
const color = "#ffffff";
// const user = { id: "bdhys", username: "ahsan88" };
// const posts = [
//   {
//     username: "ahsan88",
//     id: "diusi",
//     content:
//       "Hello I am ahsan and I am a good man.hhhfdfnfjnfdnfjdnfojfnefnbfuefbuebfuebfbefbjbfjabfahbfhabfhafhabfakbfabfakbfjabfjabfjbfjdbfdj",
//     likes: [
//       "ali",
//       "ahsan",
//       "jav",
//       "ali",
//       "ahsan",
//       "jav",
//       "ali",
//       "ahsan",
//       "jav",
//       "ali",
//       "ahsan",
//       "jav",
//       "ali",
//       "ahsan",
//       "jav",
//     ],
//     comments: [
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       { username: "jav", comment: "noice" },
//       {
//         username: "jav",
//         comment:
//           "noicejfjefiejfipefnfidnfifniegniegneigneibgebgeigbeigbiebgiebgeigbegbeigbeib",
//       },
//     ],
//   },
//   {
//     username: "ahsan88",
//     id: "diusi",
//     content: "Hello I am ahsan and I am a good man.",
//     likes: ["ali", "ahsan", "jav"],
//     comments: [{ username: "jav", comment: "noice" }],
//   },
//   {
//     username: "ahsan88",
//     id: "diusi",
//     content: "Hello I am ahsan and I am a good man.",
//     likes: ["ali", "ahsan", "jav"],
//     comments: [{ username: "jav", comment: "noice" }],
//   },
// ];
const App = () => {
  const [againRequest, setRequest] = useState(false);
  useEffect(() => {
    const again = againRequest;
    const auth = async () => {
      // setLoading(true);
      const response = await fetch(
        "https://polar-mountain-47234.herokuapp.com/api/data",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      const data = await response.json();
      // console.log(data.posts);
      setLoading(false);
      if (!data.authorized) {
        setShowIndex(true);
      } else {
        const Posts = data.posts.map((post) => {
          return {
            username: post.userId.username,
            id: post._id,
            content: post.content,
            likes: post.likes.map((like) => like.userId.username),
            comments: post.comments.map((comment) => {
              return {
                username: comment.userId.username,
                comment: comment.comment,
              };
            }),
          };
        });
        setPosts(Posts);
        setUser(data.user.username);
        showMainHandler();
      }
    };
    auth();
  }, [localStorage.getItem("Authorization"), againRequest]);
  const [posts, setPosts] = useState([]);

  const [user, setUser] = useState("");
  const setUserHandler = (value) => {
    setUser(value);
  };
  const [isLoading, setLoading] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [showIndex, setShowIndex] = useState(false);
  const showMainHandler = () => {
    setShowMain(true);
    setShowSignUp(false);
    setShowLogin(false);
    setShowIndex(false);
  };
  const showSignUpHandler = () => {
    setShowMain(false);
    setShowSignUp(true);
    setShowLogin(false);
    setShowIndex(false);
  };
  const showLoginHandler = () => {
    setShowMain(false);
    setShowSignUp(false);
    setShowLogin(true);
    setShowIndex(false);
  };
  const showIndexHandler = () => {
    setShowMain(false);
    setShowSignUp(false);
    setShowLogin(false);
    setShowIndex(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("Authorization");
    setShowMain(false);
    setShowIndex(true);
  };

  const againRequestHandler = () => {
    setRequest((state) => !state);
    console.log("sending request");
    setLoading(true);
    setShowIndex(false);
    setShowLogin(false);
    setShowSignUp(false);
    setShowMain(false);
  };
  return (
    <React.Fragment>
      {showMain && (
        <Main
          user={user}
          posts={posts}
          onLogOut={logoutHandler}
          onAgainRequest={againRequestHandler}
        />
      )}
      {showIndex && (
        <Index
          onShowSignUp={showSignUpHandler}
          onShowLogin={showLoginHandler}
        />
      )}
      {showLogin && (
        <Login
          onShowMain={showMainHandler}
          onShowSignUp={showSignUpHandler}
          onShowLogin={showLoginHandler}
          onSetUser={setUserHandler}
          onAgainRequest={againRequestHandler}
        />
      )}
      {showSignUp && (
        <SignUp
          onShowMain={showMainHandler}
          onShowSignUp={showSignUpHandler}
          onShowLogin={showLoginHandler}
          onSetUser={setUserHandler}
          onAgainRequest={againRequestHandler}
        />
      )}
      {isLoading && (
        <ClipLoader
          color={color}
          loading={isLoading}
          css={override}
          size={50}
        />
      )}
    </React.Fragment>
  );
};
export default App;
