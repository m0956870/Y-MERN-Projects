import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import axios from "axios";

import { FaEye } from "react-icons/fa";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { UserContext } from "../../App";

const Security = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  console.log(state);

  const [password, setPassword] = useState({
    password: "",
    cpassword: "",
  });

  const handleInput = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const [showPass, setShowPass] = useState({
    pass: false,
    cpass: false,
  });

  const [alert, setAlert] = useState(false);
  const [alertDiv, setAlertDiv] = useState({
    class: "",
    message: "",
  });

  const [error, setError] = useState({
    password: {
      status: false,
      text: "",
    },
    cpassword: {
      status: false,
      text: "",
    },
  });

  const [deleteModel, setDeleteModel] = useState(false);

  const updatePassFunc = async () => {
    console.log(password);
    setTimeout(() => setAlert(false), 3000);

    setTimeout(
      () =>
        setError({
          password: {
            status: false,
            text: "",
          },
          cpassword: {
            status: false,
            text: "",
          },
        }),
      3000
    );

    if (password.password.length < 6) {
      if (password.password == "") {
        return setError({
          ...error,
          password: {
            status: true,
            text: "Please fill password feild!",
          },
        });
      }
      return setError({
        ...error,
        password: {
          status: true,
          text: "Password should be 6 letters",
        },
      });
    }

    if (password.password !== password.cpassword) {
      if (password.cpassword == "") {
        return setError({
          ...error,
          cpassword: {
            status: true,
            text: "Please fill password feild!",
          },
        });
      }
      return setError({
        ...error,
        cpassword: {
          status: true,
          text: "Password did not match",
        },
      });
    }

    let dataForPass = {
      _id: state._id,
      password: password.password,
    };
    // console.log(dataForPass);

    try {
      let { data } = await axios.post("/user/update/password", dataForPass);
      console.log(data);
      if (data.status) {
        setAlertDiv({
          class: "success",
          message: data.response,
        });
        setAlert(true);
        setPassword({
          password: "",
          cpassword: "",
        });
        return setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      if (!error.response.data.status) {
        setAlertDiv({
          class: "error",
          message: "Error: Try again later!",
        });
        return setAlert(true);
      }
    }
  };

  const deleteAccFunc = async () => {
    // console.log("delet func")
    try {
      let { data } = await axios.post("/user/delete", { _id: state._id });
      // console.log(data);
      if (data.status) {
        setAlertDiv({
          class: "success",
          message: data.response,
        });
        setAlert(true);
        await dispatch({ type: "USER", payload: null });
        return navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (!error.response.data.status) {
        setAlertDiv({
          class: "error",
          message: "Error: Try again later!",
        });
        return setAlert(true);
      }
    }
  };

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

            <NavLink to="/profile">Account Details</NavLink>
            <NavLink to="/profile/edit-profile">Edit profile</NavLink>
            <NavLink to="/profile/security">Security</NavLink>
          </Left>
          <Right>
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
            <h2>Security & Password</h2>
            <Details>
              <p className="label">New Password</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  className="detail half"
                  type={showPass.pass ? "text" : "password"}
                  name="password"
                  value={password.password}
                  onChange={handleInput}
                />
                <span>
                  {showPass.pass ? (
                    <BsFillEyeSlashFill
                      style={{
                        margin: "0 0.3rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setShowPass({ ...showPass, pass: false });
                      }}
                    />
                  ) : (
                    <FaEye
                      style={{
                        margin: "0 0.3rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setShowPass({ ...showPass, pass: true });
                      }}
                    />
                  )}
                </span>
              </div>

              {error.password.status && (
                <p style={{ color: "red" }}>{error.password.text}</p>
              )}

              <p className="label">Confirm New Password</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  className="detail"
                  type={showPass.cpass ? "text" : "password"}
                  name="cpassword"
                  value={password.cpassword}
                  onChange={handleInput}
                />
                <span>
                  {showPass.cpass ? (
                    <BsFillEyeSlashFill
                      style={{
                        margin: "0 0.3rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setShowPass({ ...showPass, cpass: false });
                      }}
                    />
                  ) : (
                    <FaEye
                      style={{
                        margin: "0 0.3rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setShowPass({ ...showPass, cpass: true });
                      }}
                    />
                  )}
                </span>
              </div>
              {error.cpassword.status && (
                <p style={{ color: "red" }}>{error.cpassword.text}</p>
              )}

              <Button onClick={() => updatePassFunc()}>Update Password</Button>
            </Details>
            <h2 style={{ margin: "2rem 0 0 0" }}>Delete Account</h2>
            <Button
              onClick={() => setDeleteModel(true)}
              style={{ background: "#f44336" }}
            >
              Delete Account
            </Button>
            {deleteModel && (
              <Model>
                <h4 style={{ marginTop: "1rem" }}>Are you sure?</h4>
                <p className="label">You can not undo it</p>
                <div>
                  <Button
                    onClick={() => setDeleteModel(false)}
                    style={{ background: "#fff", color: "#000" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => deleteAccFunc()}
                    style={{ background: "#f44336" }}
                  >
                    Delete
                  </Button>
                </div>
              </Model>
            )}
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
    width: 100%;
    border: 1px solid lightgrey;
    padding: 0.3rem;
    margin: 0 0.2rem 0.2rem 0;
    border-radius: 0.3rem;
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

const Model = styled.div`
  height: auto;
  width: 60%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
    .label {
    color: grey;
    padding: 0.3rem 0.2rem 0.2rem 0;
    font-size: 0.8rem;
`;

export default Security;
