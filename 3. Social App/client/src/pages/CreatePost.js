import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";

import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { UserContext } from "../App";

// Side-Menu
import SideMenu from "../components/nav/SideMenu";

// MAIN

// Aside

const CreatePost = () => {
  const { state } = useContext(UserContext);
  // console.log(state);

  const navigate = useNavigate();

  const [alert, setAlert] = useState(false);
  const [alertDiv, setAlertDiv] = useState({
    class: "",
    message: "",
  });

  const [url, setUrl] = useState(null);
  const [description, setDescription] = useState("");

  const changePicFunc = async (e) => {
    try {
      const file = e.target.files[0];
      // console.log(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_CPRESET);
      formData.append("cloud_name", process.env.REACT_APP_CCLOUD);

      let { data } = await axios.post(process.env.REACT_APP_CURL, formData);
      // console.log(data);

      setUrl(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const postFunc = async () => {
    setTimeout(() => setAlert(false), 3000);

    if (!state) {
      setAlertDiv({
        class: "error",
        message: "Error: Log in first.",
      });
      return setAlert(true);
    }

    let fullDate = new Date().toLocaleString(navigator.language, {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
    });

    let postData = {
      url,
      description,
      date: fullDate,
      postedBy: state._id,
    };

    // console.log(postData);
    try {
      let { data } = await axios.post("/post/create-post", postData);
      console.log(data);
      if (data.status) {
        setAlertDiv({
          class: "success",
          message: data.response,
        });
        setAlert(true);

        navigate("/homepage");
        setUrl(null);
        setDescription("");
      }
    } catch (error) {
      console.log(error);
      if (!error.response.data.status) {
        setAlertDiv({
          class: "error",
          message: error.response.data.response,
        });
        return setAlert(true);
      }
    }
  };

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

        <nav>
          <SideMenu />
        </nav>

        <main>
          <h2 style={{ margin: "1rem 0" }}>Create Post</h2>
          <CreatePostDiv>
            <div class="image-upload">
              <label>
                <img
                  src={
                    url
                      ? url
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_RhLhMFQptcSkzBWhnq13UqR12y7mXuSVw&usqp=CAU"
                  }
                  style={{ width: "100%", height: "20rem" }}
                />

                <input
                  type="file"
                  onChange={(e) => changePicFunc(e)}
                  name="myfile"
                  style={{ display: "none" }}
                />
              </label>
            </div>

            <textarea
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
              rows="4"
            />

            <Button
              onClick={() => postFunc()}
              // style={{ margin: "0" }}
            >
              Post
            </Button>
          </CreatePostDiv>
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
    padding: 0 2rem;
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

const CreatePostDiv = styled.div`
  height: auto;
  width: 100%;
  background: #fff;
  textarea {
    min-width: 100%;
    margin: 0.5rem 0;
    padding: 0.5rem;
    &:focus{
        outline: none;
    }
  }
`;

const Button = styled.button`
    background: #3151b5;
    color: #fff;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
    &:hover{
      background: #2c387e;
    }
}
`;

export default CreatePost;
