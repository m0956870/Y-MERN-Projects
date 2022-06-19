import React, { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import { GoogleLogout } from "react-google-login";

const Logout = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const logoutPage = async () => {
    try {
      // await dispatch({ type: "USER", payload: null });
      //  let res = await fetch("/logout");
      //  let data = res.json()
      // console.log(data);
      // navigate("/login");

      await dispatch({ type: "USER", payload: null });
      navigate("/login");
      let {data} = await axios("/logout")
      // console.log(data);

    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };

  const logout = () => {
    console.log("google logout");
  };
  
  useEffect(() => {
    logoutPage();
  }, []);
  
  return (
    <div>
      <h2>Logout</h2>
      {/* <GoogleLogout
        id="click"
        clientId="919214382709-lu689mm58nhv1ob2lrl7um910qvnt25o.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout> */}
    </div>
  );
};

export default Logout;
