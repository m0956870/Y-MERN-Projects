import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { TextField, Avatar } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";

import Masonry from "react-masonry-css";

import PostModel from "../components/main/PostModel";

import { BsSearch } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

import { UserContext } from "../App";

// Side-Menu
import SideMenu from "../components/nav/SideMenu";

// MAIN

// Aside

const HomePage = () => {
  const { state } = useContext(UserContext);
  // console.log(state);

  const [allPosts, setAllPosts] = useState([]);
  const [postData, setPostData] = useState(null);

  const [search, setSearch] = useState("");
  const [searchModel, setSearchModel] = useState(false);
  const [searchUser, setSearchUser] = useState([]);

  const searchInput = async (e) => {
    setSearchModel(true);
    setSearch(e.target.value);
    // console.log(search)

    try {
      let { data } = await axios.get(`/user/search/${e.target.value}`);
      // console.log(data.response);
      setSearchUser(data.response);
    } catch (error) {
      console.log(error);
    }
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  const fetchAllPosts = async () => {
    try {
      let { data } = await axios.get("/post/allposts");
      // console.log(data)
      setAllPosts(data.response);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(allPosts);
  console.log(searchUser);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <>
      <Container>
        <nav>
          <SideMenu />
        </nav>

        <main>
          <Search>
            <TextField
              name="search"
              type="text"
              value={search}
              onChange={(e) => searchInput(e)}
              fullWidth="true"
              size="medium"
              id="outlined-basic"
              variant="outlined"
              margin="none"
              placeholder="Search..."
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <BsSearch size={24} style={{ marginRight: "1rem" }} />
                ),
                endAdornment: (
                  <MdOutlineCancel
                    size={28}
                    onClick={() => {
                      setSearch("");
                      setSearchModel(false);
                    }}
                  />
                ),
                // disableUnderline: true,
              }}
            />
          </Search>
          <Result>
            {!searchModel ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
              >
                {allPosts &&
                  allPosts.map((item) => (
                    <img
                      key={item._id}
                      src={item.url}
                      alt="pics"
                      onClick={() => setPostData(item)}
                    />
                  ))}
              </Masonry>
            ) : (
              <div className="search-model">
                {searchUser &&
                  searchUser.map((item) => (
                    <NavLink
                      to={`${
                        item._id === state._id
                          ? "/profile"
                          : `/profile/${item._id}`
                      }`}
                    >
                      <div>
                        <Avatar
                          alt="Profile Pic"
                          src={item.profilePic || null}
                        />
                      </div>
                      <div style={{ marginLeft: "0.5rem" }}>{item.name}</div>
                    </NavLink>
                  ))}
              </div>
            )}
          </Result>
          {postData && (
            <PModel>
              <button onClick={() => setPostData(null)} className="close">
                X
              </button>
              <PostModel _id={postData._id} />
            </PModel>
          )}
        </main>

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
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  aside {
    height: 86vh;
    width: 25%;
    margin-right: 0.5%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const Search = styled.div`
  height: 12%;
  weight: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    height: 100%;
    weight: 100%;
`;
const Result = styled.div`
  height: 88%;
  weight: 100%;
  padding: 1%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-wrap: wrap;
  .my-masonry-grid {
    display: flex;
    width: 100%;
    img {
      width: 100%;
      padding: 0 1%;
    }
  }
  .search-model {
    width: 100%;
    height: 100%;
    a {
      width: 100%;
      height: 10%;
      text-decoration: none;
      color: #000;
      font-weight: bold;
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      padding: 0.5rem;
      border-bottom: 1px solid lightgrey;
    }
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

export default HomePage;
