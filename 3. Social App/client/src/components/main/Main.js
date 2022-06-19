import React, { useState, useContext } from "react";
import styled from "styled-components";

import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import MiniCreatePost from "./MiniCreatePost";
import Post from "./Post";

import { UserContext } from "../../App";

const Main = () => {
  const { state } = useContext(UserContext);
  // console.log(state);

  const [alert, setAlert] = useState(false);
  const [alertDiv, setAlertDiv] = useState({
    class: "",
    message: "",
  });

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

        <MiniCreatePost />
        <Post routeName={"followings"} />
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 86vh;
  width: 100%;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Main;
