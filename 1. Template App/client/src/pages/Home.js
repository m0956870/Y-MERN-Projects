import React, { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";

// import { UserContext } from "../App";

const Home = () => {
  // const navigate = useNavigate();
  // const { state, dispatch} = useContext(UserContext);

  // let verifyUser = async () => {
  //   try {
  //     let { data } = await axios.get("/user/details");
  //     // console.log(data.response);
  //     if (data.status) {
  //       return dispatch({ type: "USER", payload: data.response });
  //     }
  //   } catch (error) {
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   verifyUser();
  // }, []);

  return (
      <Container>
        <h2 style={{ textAlign: "center", margin: "2rem" }}>Home Page</h2>
      </Container>
  );
};

const Container =  styled.div`
 min-height: 90vh;
 width: 100%;
`

export default Home;
