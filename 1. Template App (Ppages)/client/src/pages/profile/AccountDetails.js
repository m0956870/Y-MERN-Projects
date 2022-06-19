import React, { useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import axios from "axios";

import { UserContext } from "../../App";

const AccountDetails = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  console.log(state);

  let verifyUser = async () => {
    try {
      let { data } = await axios.get("/user/details");
      // console.log(data.response);
      if (data.status) {
        return dispatch({ type: "USER", payload: data.response });
      }
    } catch (error) {
      // console.log(error)
      return navigate("/login");
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      {state && (
        <Container>
          <Left>
            <div className="profile-pic">
              <Avatar
                alt="Profile Pic"
                src={state ? state.profilePic : null}
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            <NavLink to="/profile" >
              Account Details
            </NavLink>
            <NavLink to="/profile/edit-profile">Edit profile</NavLink>
            <NavLink to="/profile/security">Security</NavLink>
          </Left>
          <Right>
            <h2> Account Details </h2>
            <Details>
              {state && (
                <>
                  <p className="label">ID</p>
                  <p className="detail">{state._id}</p>
                  <div style={{ display: "flex" }}>
                    <p className="label half">First Name</p>
                    <p className="label half">Last Name</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p className="detail half">{state.name}</p>
                    <p className="detail half">{state.lastName}</p>
                  </div>
                  <p className="label">Email</p>
                  <p className="detail">{state.email}</p>
                  <p className="label">Phone</p>
                  <p className="detail">{state.phone}</p>
                  <h2 style={{ margin: "2rem 0 1rem 0" }}>Personal Details</h2>
                  <div style={{ display: "flex" }}>
                    <p className="label half">Gender</p>
                    <p className="label half">Birthday (yyyy-mm-dd)</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p className="detail half">{state.gender}</p>
                    <p className="detail half">{state.birthday}</p>
                  </div>
                  <p className="label">address</p>
                  <p className="detail">
                    {state.address && state.address.address}
                  </p>
                  <div style={{ display: "flex" }}>
                    <p className="label half">City</p>
                    <p className="label half">State</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p className="detail half">
                      {state.address && state.address.city}
                    </p>
                    <p className="detail half">
                      {state.address && state.address.state}
                    </p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p className="label half">ZIP</p>
                    <p className="label half">Country</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p className="detail half">
                      {state.address && state.address.zip}
                    </p>
                    <p className="detail half">
                      {state.address && state.address.country}
                    </p>
                  </div>
                  <div style={{ margin: "1rem 0" }}>
                    <span style={{ marginRight: "0.3rem" }}>Date Joined:</span>
                    <span style={{ color: "grey" }}>{state.date}</span>
                  </div>
                </>
              )}
            </Details>
          </Right>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
`;

const Left = styled.div`
 background: #3151b5; 
  height: 100%;
  width: 17%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  .profile-pic {
    width: 100%;
    height: auto;
    padding: 1rem;
  }
  a {
    width: 100%;
    text-decoration: none;
    border: none;
    border-bottom: 0.5px solid #fff;
    color: #fff;
    padding: 0.5rem;
    text-align: left;
    background: #3151b5;
    transition: all 0.1s ease-in-out;
    &:hover {
      background: #2c387e;
      color: #fff;
    }
  }
`;

const Right = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem 3rem;
  font-family: sans-serif;
`;

const Details = styled.div`
  height: auto;
  width: 60%;
  margin-top: 1rem;
  font-size: 0.8rem;
  .label {
    color: grey;
    padding: 0.3rem 0.2rem 0.2rem 0;
  }
  .half {
    width: 50%;
  }
  .detail {
    min-height: 25px;
    border: 1px solid lightgrey;
    padding: 0.3rem;
    margin: 0 0.2rem 0.2rem 0;
    border-radius: 0.3rem;
  }
`;

export default AccountDetails;
