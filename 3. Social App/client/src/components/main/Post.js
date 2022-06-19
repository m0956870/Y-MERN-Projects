import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { Avatar } from "@material-ui/core";

import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { BiDotsVerticalRounded, BiComment } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";

import PostModel from "./PostModel";

import { UserContext } from "../../App";

const Post = ({ routeName }) => {
  const { state } = useContext(UserContext);
  // console.log(state);

  console.log(routeName);

  const [alert, setAlert] = useState(false);
  const [alertDiv, setAlertDiv] = useState({
    class: "",
    message: "",
  });

  const [allPosts, setAllPosts] = useState([]);

  const [comment, setComment] = useState("");

  const [postData, setPostData] = useState(null);

  const likeFunc = async (_id) => {
    // console.log(_id);
    try {
      let { data } = await axios.post("/post/like", { _id });
      console.log(data);
      getAllPostFunc();
    } catch (error) {
      console.log(error);
    }
  };

  const unlikeFunc = async (_id) => {
    // console.log(_id);
    try {
      let { data } = await axios.post("/post/unlike", { _id });
      console.log(data);
      getAllPostFunc();
    } catch (error) {
      console.log(error);
    }
  };


  const commentFunc = async (_id) => {
    // console.log(_id);
    if (!comment) {
      return window.alert("no text");
    }

    let postedBy = {
      name: state.name,
      email: state.email,
      _id: state._id,
      profilePic: state.profilePic,
    };

    let commentData = {
      comment,
      postedBy,
    };

    // console.log(commentData);
    try {
      let { data } = await axios.post(`/post/comment/${_id}`, commentData);
      console.log(data);
      getAllPostFunc();
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCommentFunc = async (_id) => {
    console.log(_id);
    try {
      let { data } = await axios.get(`/post/uncomment/${_id}`);
      console.log(data);
      getAllPostFunc();
    } catch (error) {
      console.log(error);
    }
  };

    const deletePostFunc = async (_id) => {
      // console.log(_id);
      setTimeout(() => setAlert(false), 3000);

      try {
        let { data } = await axios.delete(`/post/delete/${_id}`);
        console.log(data);
        if (data.status) {
          setAlertDiv({
            class: "success",
            message: data.response,
          });
          setAlert(true);
          getAllPostFunc();
        }
      } catch (error) {
        console.log(error);
      }
    };

  const FetchName = ({ id }) => {
    console.log(id);

    let [name, SetName] = useState("");

    let getName = async () => {
      try {
        let { data } = await axios.get(`/user/find/${id}`);
        // console.log(data.response);

        data.response.map((user) => SetName(user.name));
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getName();
    }, []);
    return (
      <>
        <span>{name}</span>
      </>
    );
  };

  const FetchURL = ({ id, cc }) => {
    console.log(id);
    // console.log(cc);

    let [url, setUrl] = useState(null);

    let getURL = async () => {
      try {
        let { data } = await axios.get(`/user/find/${id}`);
        // console.log(data.response);

        data.response.map((user) => setUrl(user.profilePic));
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getURL();
    }, []);
    return (
      <>
        <Avatar alt="Profile Pic" src={url ? url : null} style={cc && cc} />
      </>
    );
  };

  // const postModel = async (post) => {
  //   // console.log(post)
  //   setPostData(post)
  // }

  const getAllPostFunc = async () => {
    try {
      let { data } = await axios.get(`/post/${routeName}`);
      console.log(data);
      setAllPosts(data.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPostFunc();
  }, []);

  console.log(allPosts);

  return (
    <>
      <Container>
        {alert && (
          <div id="alert">
            <div className={alertDiv.class}>
              {alertDiv.class === "success" ? (
                <IoMdCheckmarkCircleOutline
                  style={{ marginRight: "0.5rem", fontSize: "1.5rem" }}
                />
              ) : (
                <BiErrorCircle
                  style={{ marginRight: "0.5rem", fontSize: "1.5rem" }}
                />
              )}
              {alertDiv.message}
            </div>
          </div>
        )}

        {allPosts.length === 0 && <div>No data</div>}

        {allPosts.map((post) => (
          <>
            <PostDiv key={post._id}>
              <Head>
                <UserDetail>
                  <NavLink
                    to={`${
                      post.postedBy === state._id
                        ? "/profile"
                        : `/profile/${post.postedBy}`
                    }`}
                  >
                    <FetchURL id={post.postedBy} />
                  </NavLink>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: "0.8rem",
                    }}
                  >
                    <NavLink
                      to={`${
                        post.postedBy === state._id
                          ? "/profile"
                          : `/profile/${post.postedBy}`
                      }`}
                    >
                      <h4>
                        <FetchName id={post.postedBy} />
                      </h4>
                    </NavLink>

                    <p style={{ color: "grey", fontSize: "12px" }}>
                      {post.date}
                    </p>
                  </div>
                </UserDetail>
                <div className="head-actions">
                  {post.postedBy === state._id ? (
                    <MdDeleteForever
                      size={24}
                      onClick={() => deletePostFunc(post._id)}
                    />
                  ) : (
                    <BiDotsVerticalRounded size={24} />
                  )}
                </div>
              </Head>

              <Body>
                <img
                  src={post.url}
                  alt="pic"
                  onClick={() => setPostData(post)}
                />
              </Body>

              <Actions>
                <ActionButton>
                  <div className="left">
                    {!post.likes.includes(state._id) ? (
                      <>
                        <div>
                          <AiOutlineHeart
                            size={26}
                            onClick={() => likeFunc(post._id)}
                            style={{ marginRight: "0.5rem" }}
                          />
                        </div>
                        <div>{`${post.likes.length} Likes`}</div>
                      </>
                    ) : (
                      <>
                        <div>
                          <AiFillHeart
                            size={26}
                            style={{ color: "red", marginRight: "0.5rem" }}
                            onClick={() => unlikeFunc(post._id)}
                          />
                        </div>
                        <div>{`${post.likes.length} Likes`}</div>
                      </>
                    )}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <BiComment
                        size={24}
                        style={{ marginLeft: "0.5rem" }}
                        onClick={() => setPostData(post)}
                      />
                      <span
                        style={{ marginLeft: "0.5rem" }}
                        onClick={() => setPostData(post)}
                      >
                        {`${post.comments.length} Comments`}
                      </span>
                    </div>
                  </div>
                  <BsBookmark size={24} />
                </ActionButton>
                <Description>
                  <NavLink
                    to={`${
                      post.postedBy === state._id
                        ? "/profile"
                        : `/profile/${post.postedBy}`
                    }`}
                  >
                    <h4 style={{ marginRight: "0.3rem" }}>
                      <FetchName id={post.postedBy} />
                    </h4>
                  </NavLink>

                  <h5 style={{ color: "grey" }}>{post.description}</h5>
                </Description>
                <Comment>
                  <Avatar
                    alt="Profile Pic"
                    src={state ? state.profilePic : null}
                  />
                  <input
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    type="text"
                  />
                  <AiOutlineSend
                    size={32}
                    style={{ fontWeight: "100" }}
                    onClick={() => commentFunc(post._id)}
                  />
                </Comment>
                {post.comments.length === 1 ? (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      color: "grey",
                      fontSize: "0.9rem",
                    }}
                    onClick={() => setPostData(post)}
                  >
                    View {post.comments.length} comment
                  </div>
                ) : post.comments.length !== 0 ? (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      color: "grey",
                      fontSize: "0.9rem",
                    }}
                    onClick={() => setPostData(post)}
                  >
                    View all {post.comments.length} comments
                  </div>
                ) : null}
              </Actions>
            </PostDiv>
          </>
        ))}
        {postData && (
          <PModel>
            <button onClick={() => setPostData(null)} className="close">
              X
            </button>
            <PostModel _id={postData._id} />
          </PModel>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
`;

const PostDiv = styled.div`
  height: auto;
  width: 100%;
  margin: 1.5vh 0;
  padding: 0 1rem 1rem 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Head = styled.div`
  height: 15%;
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserDetail = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  a {
    text-decoration: none;
    color: #000;
  }
`;

const Body = styled.div`
  height: 60%;
  width: 100%;
  img {
    width: 100%;
    height: auto;
    max-height: 30rem;
    object-fit: cover;
  }
`;

const Actions = styled.div`
  height: 25%;
  width: 100%;
`;

const ActionButton = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0 0 0;
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Description = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  justify-content: start;
  align-items: center;
  a {
    text-decoration: none;
    color: #000;
  }
`;

const Comment = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  input {
    flex: 1;
    height: 2rem;
    margin: 0 0.5rem;
    padding: 0 1rem;
    border-radius: 1rem;
    border: 0.1rem solid #d3d3d3;
  }
  input:focus {
    outline: none;
  }
`;

const PModel = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 70vh;
  width: 60vw;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  .close {
    position: absolute;
    top: -1rem;
    right: 0;
    z-index: 10;
  }
`;

export default Post;
