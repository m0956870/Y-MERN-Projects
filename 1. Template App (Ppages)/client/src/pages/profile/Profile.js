// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate, useParams, NavLink } from "react-router-dom";
// import styled from "styled-components";
// import { Avatar } from "@material-ui/core";
// import axios from "axios";

// import { UserContext } from "../App";

// import AccountDetails from "./profile/AccountDetails";
// import EditProfile from "../components/profile/EditProfile";
// import Security from "../components/profile/Security";

// const Profile = () => {
//   const navigate = useNavigate();
//   const { state, dispatch } = useContext(UserContext);
//   console.log(state);

//   const [value, setValue] = useState("1");

//   let verifyUser = async () => {
//     try {
//       let { data } = await axios.get("/user/details");
//       // console.log(data.response);
//       if (data.status) {
//         return dispatch({ type: "USER", payload: data.response });
//       }
//     } catch (error) {
//       // console.log(error)
//       return navigate("/login");
//     }
//   };

//   useEffect(() => {
//     verifyUser();
//   }, []);

//   return (
//     <>
//       {state && (
//         <Container>
//           <Left>
//             <div className="profile-pic">
//               <Avatar
//                 alt="Profile Pic"
//                 src={state ? state.profilePic : null}
//                 style={{ width: "100%", height: "100%" }}
//               />
//             </div>
//             <button onClick={(e) => setValue(e.target.value)} value="1">
//               Account Details
//             </button>
//             <button onClick={(e) => setValue(e.target.value)} value="2">
//               Edit Profile
//             </button>
//             <button onClick={(e) => setValue(e.target.value)} value="3">
//               Password & Security
//             </button>

//             {/* <NavLink to="/profile">
//               Account Details
//             </NavLink>
//             <NavLink to="/profile/acc" >
//               edit profile
//             </NavLink>
//             <NavLink to="/profile/sec">
//               Security
//             </NavLink> */}
//           </Left>
//           <Right>
//             {value === "1" ? <AccountDetails /> : null}
//             {value === "2" ? <EditProfile /> : null}
//             {value === "3" ? <Security /> : null}
//           </Right>
//         </Container>
//       )}
//     </>
//   );
// };

// const Container = styled.div`
//   height: 90vh;
//   width: 100%;
//   display: flex;
//   justify-content: start;
//   align-items: start;
// `;
// const Left = styled.div`
//   background: #3151b5;
//   height: 100%;
//   width: 17%;
//   display: flex;
//   flex-direction: column;
//   justify-content: start;
//   align-items: start;
//   .profile-pic {
//     width: 100%;
//     height: auto;
//     padding: 1rem;
//   }
//   button {
//     width: 100%;
//     border: none;
//     border-bottom: 0.5px solid #fff;
//     color: #fff;
//     padding: 0.5rem;
//     text-align: left;
//     background: #3151b5;
//     transition: all 0.1s ease-in-out;
//     &:hover {
//       background: #2c387e;
//       color: #fff;
//     }
//   }
// `;

// const Right = styled.div`
//   height: 100%;
//   width: 83%;
//   display: flex;
//   flex-direction: column;
//   justify-content: start;
//   align-items: start;
//   overflow-x: hidden;
//   overflow-y: scroll;
// `;

// export default Profile;
