import React from "react";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <h2 style={{ textAlign: "center", margin: "2rem" }}>Landing Page</h2>
      <NavLink to="/homepage">
        Get Started
      </NavLink>
    </>
  );
};

export default LandingPage;
