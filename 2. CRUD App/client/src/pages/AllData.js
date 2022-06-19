import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { UserContext } from "../App";

const AllData = () => {
  const { state } = useContext(UserContext);

  const [allData, setAllData] = useState([]);

  const [alert, setAlert] = useState(false);
  const [alertDiv, setAlertDiv] = useState({
    class: "",
    message: "",
  });

  const deleteDataFunc = async (item) => {
    setTimeout(() => setAlert(false), 3000);

    // console.log(item)
    try {
      let { data } = await axios.delete(`/data/delete/${item._id}`);
      console.log(data);
      if (data.status) {
        setAlertDiv({
          class: "success",
          message: data.response,
        });
        setAlert(true);
        fetchAllData();
      }
    } catch (error) {
      console.log(error);
      setAlertDiv({
        class: "error",
        message: "Error: Some error!",
      });
      setAlert(true);
    }
  };

  const fetchAllData = async () => {
    let res = await axios.get("/data/alldata");
    // console.log(res.data.response)
    setAllData(res.data.response);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
      <Container>
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
        <Table className="table">
          <TableHead style={{ backgroundColor: "#000" }}>
            <TableRow>
              <TableCell style={{ color: "#fff" }}>ID</TableCell>
              <TableCell style={{ color: "#fff" }}>Name</TableCell>
              <TableCell style={{ color: "#fff" }}>Email</TableCell>
              <TableCell style={{ color: "#fff" }}>Phone</TableCell>
              <TableCell style={{ color: "#fff" }}>Updated</TableCell>
              <TableCell style={{ color: "#fff" }}>Created</TableCell>
              <TableCell style={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData.map((item, i) => (
              <TableRow key={item._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                {item.updated ? (
                  <TableCell>
                    <div>Date: {item.updated.date}</div>
                    <div>Time: {item.updated.time}</div>
                  </TableCell>
                ) : (
                  <TableCell></TableCell>
                )}
                <TableCell>
                  <div>Date: {item.created.date}</div>
                  <div>Time: {item.created.time}</div>
                </TableCell>
                <TableCell>
                  {state._id === item.postedBy && (
                    <Button
                      onClick={() => deleteDataFunc(item)}
                      style={{ background: "#f44336" }}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Button = styled.button`
    background: #3151b5;
    color: #fff;
    margin: 0 0 0 0.5rem;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
    &:hover{
      background: #2c387e;
    }
}
`;

export default AllData;
