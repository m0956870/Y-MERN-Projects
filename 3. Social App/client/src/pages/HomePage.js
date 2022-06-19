import React from "react";
import styled from "styled-components";

// Side-Menu
import SideMenu from "../components/nav/SideMenu";

// MAIN
import Main from "../components/main/Main";

// Aside

const HomePage = () => {
  return (
    <>
      <Container>
        <nav>
          <SideMenu />
        </nav>

        <main>
        <Main />
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
  }
  aside {
    height: 86vh;
    width: 25%;
    margin-right: 0.5%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

export default HomePage;
