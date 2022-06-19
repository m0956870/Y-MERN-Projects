import React from "react";
import styled from "styled-components";

const MiniCreatePost = () => {
  return (
    <>
      <Container>
        <div className="main">Create</div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 20vh;
  width: 100%;
  margin-bottom: 1vh;
  padding: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  .main{
  height: 100%;
  width: 100%;
  border: 1px solid black;

  }
`;

export default MiniCreatePost;
