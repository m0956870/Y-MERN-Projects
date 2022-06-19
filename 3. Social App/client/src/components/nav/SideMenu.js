import React, { useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";

import { Avatar } from "@material-ui/core";

import { UserContext } from "../../App";

const SideMenu = () => {
  const { state } = useContext(UserContext);
  console.log(state);
  return (
    <>
      <Container>
        {state ? (
          <NavProfile>
            <NavLink to="/profile">
              <Avatar
                className="profile-pic"
                alt="Profile Pic"
                src={state ? state.profilePic : null}
                variant="rounded"
              />
            </NavLink>
            <div className="profile-details">
              <p>{state.name}</p>
              <p>{state.email}</p>
            </div>
          </NavProfile>
        ) : (
          <NavProfile>
            <p>Log In</p>
          </NavProfile>
        )}

        <NavLinks>
          <div className="menu-navlinks">
            <NavLink to="/homepage" style={{ paddingTop: "1rem" }}>
              Home Page
            </NavLink>
            <NavLink to="/explore">Explore Page</NavLink>
            <NavLink to="/create-post">Create Post</NavLink>
          </div>

          {state && (
            <div className="profile-navlinks">
              <NavLink to="/profile/">Profile</NavLink>
              <NavLink to="/account/account-details">Account Details</NavLink>
              <NavLink to="/account/edit-details">Edit Profile</NavLink>
              <NavLink to="/account/password-&-security">
                Password & Security
              </NavLink>
              
              <NavLink to="/logout" style={{ paddingBottom: "1rem" }}>
                Logout
              </NavLink>
            </div>
          )}
        </NavLinks>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const NavProfile = styled.div`
  height: 12%;
  width: 100%;
  margin-bottom: 5%;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  justify-content: start;
  align-items: center;
  .profile-details {
    margin-left: 0.5rem;
    p {
      font-size: 0.8rem;
    }
  }
`;
const NavLinks = styled.div`
  height: 86%;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  a {
    display: inline-block;
    width: 100%;
    border: none;
    text-decoration: none;
    border-bottom: 0.5px solid #fff;
    color: grey;
    padding: 0.3rem 1rem;
    text-align: left;
    transition: all 0.1s ease-in-out;
    &:hover {
      color: #000;
    }
  }
`;

export default SideMenu;
