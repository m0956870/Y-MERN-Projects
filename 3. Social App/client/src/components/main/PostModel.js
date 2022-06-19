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

import { UserContext } from "../../App";

const PostModel = (props) => {
  const { state } = useContext(UserContext);
  // console.log(state);

  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    console.log(props._id);
    try {
      let { data } = await axios.get(`/post/find/${props._id}`);
      console.log(data.response);
      setPost(data.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [props._id]);

  const [comment, setComment] = useState("");


  const likeFunc = async (_id) => {
    // console.log(_id);
    try {
      let { data } = await axios.post("/post/like", { _id });
      console.log(data);
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  const unlikeFunc = async (_id) => {
    // console.log(_id);
    try {
      let { data } = await axios.post("/post/unlike", { _id });
      console.log(data);
      fetchPost();
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
      fetchPost();

      // getAllPostFunc();
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCommentFunc = async (_id) => {
    //  console.log(_id);
    try {
      let { data } = await axios.get(`/post/uncomment/${_id}`);
      console.log(data);
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

    const deletePostFunc = async (_id) => {
      // console.log(_id);
      // setTimeout(() => setAlert(false), 3000);

      try {
        let { data } = await axios.delete(`/post/delete/${_id}`);
        console.log(data);
        //   if (data.status) {
        //     setAlertDiv({
        //       class: "success",
        //       message: data.response,
        //     });
        //     setAlert(true);
        // setTimeout(() => getAllPostFunc(), 1000);
        //   }
      } catch (error) {
        console.log(error);
      }
    };

  const FetchName = ({ id, cc }) => {
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
        <span style={cc && cc}>{name}</span>
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

  return (
    <Container>
      {post && (
        <>
          <Left>
            <img src={post.url} alt="url" />
          </Left>

          <Right>
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
                    paddingLeft: "0.5rem",
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

                  <p style={{ color: "grey", fontSize: "12px" }}>{post.date}</p>
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
                    <div>{post.likes.length}</div>
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
                    <div>{post.likes.length}</div>
                  </>
                )}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BiComment size={24} style={{ marginLeft: "0.5rem" }} />
                  <span style={{ marginLeft: "0.5rem" }}>
                    {post.comments.length}
                  </span>
                </div>
              </div>
              <BsBookmark size={24} />
            </ActionButton>

            <ScrollDiv>
              <Description>
                {/* <NavLink
                  to={`${
                    post.postedBy === state._id
                      ? "/profile"
                      : `/profile/${post.postedBy}`
                  }`}
                > */}

                <span style={{ color: "grey" }}>
                  <FetchName
                    id={post.postedBy}
                    cc={{
                      color: "#000",
                      marginRight: "0.5rem",
                      fontWeight: "bold",
                    }}
                  />
                  {post.description}
                </span>
                {/* </NavLink> */}
              </Description>

              {post.comments.length === 0 && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    color: "grey",
                    fontSize: "0.9rem",
                  }}
                >
                  No Comments
                </div>
              )}

              {post.comments.map((comment) => (
                <Comments>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <NavLink
                      to={`${
                        comment.postedBy === state._id
                          ? "/profile"
                          : `/profile/${comment.postedBy}`
                      }`}
                    >
                      <FetchURL
                        id={comment.postedBy}
                        cc={{ width: 24, height: 24 }}
                      />
                    </NavLink>
                    <NavLink
                      to={`${
                        comment.postedBy === state._id
                          ? "/profile"
                          : `/profile/${comment.postedBy}`
                      }`}
                    >
                      <h5>
                        <FetchName id={comment.postedBy} />
                      </h5>
                    </NavLink>

                    <h5 className="comment">{comment.comment}</h5>
                  </div>

                  <div>
                    {comment.postedBy === state._id && (
                      <button onClick={() => deleteCommentFunc(comment._id)}>
                        delete
                      </button>
                    )}
                  </div>
                </Comments>
              ))}
            </ScrollDiv>

            <CommentInput>
              <Avatar alt="Profile Pic" src={state ? state.profilePic : null} />
              <input
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                type="text"
              />
              {/* <AiOutlineSend
            size={16}
            onClick={() => commentFunc(post._id)}
          /> */}
              <button
                className="comment-button"
                onClick={() => commentFunc(post._id)}
              >
                Post
              </button>
            </CommentInput>
          </Right>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 70vh;
  width: 60vw;
  display: flex;
  ${"" /* flex-direction: column; */}
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Left = styled.div`
  height: 100%;
  width: 55%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    max-height: 100%;
  }
`;

const Right = styled.div`
  height: 100%;
  width: 45%;
  background: #fff;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border-left: 1px solid grey;
`;

const Head = styled.div`
  height: 12%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgrey;
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

const ActionButton = styled.div`
  height: 8%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ScrollDiv = styled.div`
  height: 70%;
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Description = styled.div`
  height: auto;
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

const Comments = styled.div`
  height: auto;
  width: 100%;
  padding: 0.3rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    text-decoration: none;
    color: #000;
  }
  h5 {
    padding-left: 0.3rem;
  }
  .comment {
    color: grey;
  }
  button {
    font-size: 0.7rem;
    padding: 0 0.2rem;
    background: #fff;
    color: red;
    border-radius: 1rem;
    border: none;
    &:hover {
      background: red;
      color: #fff;
    }
  }
`;

const CommentInput = styled.div`
  height: 10%;
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: start;
  align-items: center;
  input {
    height: 2.4rem;
    width: 100%;
    padding: 0 2.8rem 0 1rem;
    margin-right: 1rem;
    margin-left: 0.5rem;
    border-radius: 1rem;
    border: 0.1rem solid #d3d3d3;
  }
  input:focus {
    outline: none;
  }
  .comment-button {
    margin-left: -4rem;
    font-weight: bold;
    padding: 0.3rem 0.5rem;
    background: #fff;
    color: blue;
    border-radius: 1rem;
    border: none;
    &:hover {
      background: blue;
      color: #fff;
    }
  }
`;

export default PostModel;
