import "./App.css";
import React, { createContext, useReducer } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

// import Profile from "./pages/profile/Profile";
import AccountDetails from "./pages/profile/AccountDetails";
import EditProfile from "./pages/profile/EditProfile";
import Security from "./pages/profile/Security";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Errorpage from "./pages/Errorpage";

import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

import Navbar from "./components/Navbar";

import { reducer, initialState } from "./reducer/UserReducer";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ state, dispatch }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/profile" element={<AccountDetails />} />
            <Route path="/profile/edit-profile" element={<EditProfile />} />
            <Route path="/profile/security" element={<Security />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Errorpage />} />

            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
