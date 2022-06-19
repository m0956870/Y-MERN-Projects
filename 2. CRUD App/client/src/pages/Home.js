import React, { useContext } from "react";
import CRUD from "./CRUD";

import { UserContext } from "../App";

const Home = () => {
  const { state } = useContext(UserContext);
  console.log(state);

  return <>{state && <CRUD />}</>;
};

export default Home;
