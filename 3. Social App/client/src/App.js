import "./App.css";
import React, { createContext, useReducer } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/basic/Login";
import Signup from "./pages/basic/Signup";
import Logout from "./pages/basic/Logout";
import Errorpage from "./pages/basic/Errorpage";

import ForgetPassword from "./pages/basic/ForgetPassword";
import ResetPassword from "./pages/basic/ResetPassword";

// Main pages
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Explore from "./pages/Explore";

import CreatePost from "./pages/CreatePost";

import Account from "./pages/Account";

import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";

// Components
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
            <Route path="/" element={<LandingPage />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/explore" element={<Explore />} />

            <Route path="/create-post" element={<CreatePost />} />

            <Route path="/account/:route" element={<Account />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:_id" element={<UserProfile />} />

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
