import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { Avatar } from "@material-ui/core";

import SideMenu from "../components/nav/SideMenu";
import Post from "../components/main/Post";

import PostModel from "../components/main/PostModel";

import { BsGrid3X3, BsFilePostFill } from "react-icons/bs";

import { UserContext } from "../App";

const Profile = () => {
  const { state } = useContext(UserContext);
  console.log(state);

  const [myPosts, setMyPosts] = useState([]);

  const [grid, setGrid] = useState(true);

  const [postData, setPostData] = useState(null);

  const fetchMyPosts = async () => {
    try {
      let { data } = await axios.get("/post/myposts");
      // console.log(data)
      setMyPosts(data.response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(myPosts);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <>
      <Container>
        <nav>
          <SideMenu />
        </nav>

        {state && (
          <main>
            <ProfileDiv>
              <ProfileHead>
                <div className="right-head">
                  <Avatar
                    className="img"
                    alt="Profile Pic"
                    src={state.profilePic ? state.profilePic : null}
                  />
                </div>
                <div className="left-head">
                  <div
                    style={{
                      marginBottom: "0.3rem",
                      fontSize: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {state.name}
                  </div>
                  <div style={{ margin: "0.2rem 0" }}>{state.email}</div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <div className="left-info">
                      <div className="info-count">
                        {myPosts.length ? myPosts.length : 0}
                      </div>
                      <div>Posts</div>
                    </div>
                    <div className="left-info">
                      <div className="info-count">{state.followers.length}</div>
                      <div>Followers</div>
                    </div>
                    <div className="left-info">
                      <div className="info-count">{state.following.length}</div>
                      <div>Following</div>
                    </div>
                  </div>
                  <NavLink to="/account/edit-details">
                    <button style={{ width: "100%", height: "1.5rem" }}>
                      Edit Profile
                    </button>
                  </NavLink>
                </div>
              </ProfileHead>

              <GridAction>
                <BsGrid3X3 onClick={() => setGrid(true)} />
                <BsFilePostFill onClick={() => setGrid(false)} />
              </GridAction>

              <ProfileBody>
                {grid ? (
                  myPosts.map((item) => (
                    <img
                      className="img"
                      key={item._id}
                      src={item.url}
                      alt="pics"
                      style={{ width: "32%" }}
                      onClick={() => setPostData(item)}
                    />
                  ))
                ) : (
                  <Post routeName={"myposts"} className="single" />
                )}
                {postData && (
                  <PModel>
                    <button onClick={() => setPostData(null)} className="close">
                      X
                    </button>
                    <PostModel _id={postData._id} />
                  </PModel>
                )}
              </ProfileBody>
            </ProfileDiv>
          </main>
        )}

        <aside></aside>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: auto;
  width: 98vw;
  display: flex;
  justify-content: start;
  align-items: start;
  margin: 2vh;
  nav {
    height: 86vh;
    width: 20%;
    margin-right: 1.5vw;
  }
  main {
    height: 86vh;
    width: 55%;
    margin-right: 1.5vw;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  aside {
    height: 86vh;
    width: 25%;
    margin-right: 0.5%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    ${"" /* background: orange */}
  }
`;

const ProfileDiv = styled.div`
  width: 100%;
  height: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;
const ProfileHead = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  .right-head {
    width: 30%;
    .img {
      width: 100%;
      height: 10rem;
    }
  }
  .left-head {
    width: 70%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .left-info {
      margin: 0.5rem;
      .info-count {
        display: grid;
        place-items: center;
      }
    }
  }
`;

const GridAction = styled.div`
  height: 2rem;
  width: 100%;
  margin: 1rem 0 0 0;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ProfileBody = styled.div`
  width: 100%;
  height: auto;
  margin: 1rem 0;

  .single {
    width: 100%;
  }

  .img {
    height: 10rem;
    object-fit: cover;
    margin: 0 0.7% 0 0;
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

export default Profile;
