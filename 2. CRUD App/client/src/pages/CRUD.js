import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";

import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { UserContext } from "../App";

const CRUD = () => {
  const { state } = useContext(UserContext);
  // console.log(state);

  const [addDataModel, setAddDataModel] = useState(false);
  const [editDataModel, setEditDataModel] = useState(false);

  const [allData, setAllData] = useState([]);
  const [currentData, setCurrentData] = useState(undefined);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const editHandleInput = (e) => {
    setCurrentData({ ...currentData, [e.target.name]: e.target.value });
    // console.log(currentData)
  };

  const [alert, setAlert] = useState(false);
  const [alertDiv, setAlertDiv] = useState({
    class: "",
    message: "",
  });

  const [error, setError] = useState({
    name: {
      status: false,
      text: "",
    },
    email: {
      status: false,
      text: "",
    },
    phone: {
      status: false,
      text: "",
    },
  });

  const addDataFunc = async () => {
    setTimeout(() => setAlert(false), 3000);

    setTimeout(
      () =>
        setError({
          name: {
            status: false,
            text: "",
          },
          email: {
            status: false,
            text: "",
          },
          phone: {
            status: false,
            text: "",
          },
        }),
      3000
    );

    if (user.name == "") {
      return setError({
        ...error,
        name: {
          status: true,
          text: "Please fill name feild!",
        },
      });
    }

    let re = /\S+@\S+\.\S+/;

    if (!re.test(user.email)) {
      if (user.email.length === 0) {
        return setError({
          ...error,
          email: {
            status: true,
            text: "Please fill email feild!",
          },
        });
      }
      return setError({
        ...error,
        email: {
          status: true,
          text: "Invalid Email!",
        },
      });
    }

    let wholeDate = new Date().toLocaleDateString(navigator.language, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    let wholeTime = new Date().toLocaleTimeString(navigator.language, {
      hour: "numeric",
      minute: "numeric",
    });

    try {
      let fullData = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        postedBy: state._id,
        created: {
          date: wholeDate,
          time: wholeTime,
        }
      };
      console.log(fullData);

      let { data } = await axios.post("/data/add", fullData);
      console.log(data);

      if (data.status) {
        fetchAllData();
        setAddDataModel(false);
        setUser({
          name: "",
          email: "",
          phone: "",
        });
        setAlertDiv({
          class: "success",
          message: data.response,
        });
        return setAlert(true);
      }
    } catch (error) {
      console.log(error);
      setAlertDiv({
        class: "error",
        message: "Error: Some error!",
      });
      return setAlert(true);
    }
  };

  const editDataFunc = (item) => {
    console.log(item);
    setCurrentData(item);
    setEditDataModel(true);
  };

  const editData = async () => {
    setTimeout(() => setAlert(false), 3000);

    let wholeDate = new Date().toLocaleDateString(navigator.language, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    let wholeTime = new Date().toLocaleTimeString(navigator.language, {
      hour: "numeric",
      minute: "numeric",
    });

    let fullData = {
      _id: currentData._id,
      name: currentData.name,
      email: currentData.email,
      phone: currentData.phone,
      postedBy: currentData.postedBy,
      date: currentData.date,
      time: currentData.time,
      updated: {
        date: wholeDate,
        time: wholeTime,
      },
    };
    // console.log(fullData);

    try {
      let { data } = await axios.post("/data/edit", fullData);
      // console.log(data);
      if (data.status) {
        fetchAllData();
        setEditDataModel(false);
        setAlertDiv({
          class: "success",
          message: data.response,
        });
        return setAlert(true);
      }
    } catch (error) {
      console.log(error);
      setAlertDiv({
        class: "error",
        message: "Error: Some error!",
      });
      return setAlert(true);
    }
  };

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

  const deleteAllFunc = async () => {
    setTimeout(() => setAlert(false), 3000);

    if (allData.length === 0) {
      setAlertDiv({
        class: "error",
        message: "Error: No data to delete!",
      });
      return setAlert(true);
    }

    try {
      let { data } = await axios.get(`/data/delete-all/${state._id}`);
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
    try {
      let { data } = await axios.get(`/data/${state._id}`);
      console.log(data);
      if (data.status) {
        return setAllData(data.response);
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
        <Head>
          <h4>Create User</h4>
          <div>
            <Button
              style={{ background: "#4caf50" }}
              onClick={() => setAddDataModel(true)}
            >
              Add New
            </Button>
            <Button
              onClick={() => deleteAllFunc()}
              style={{ background: "#f44336" }}
            >
              Delete All
            </Button>
          </div>
        </Head>
        <TableDiv>
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
                    <Button onClick={() => editDataFunc(item)}>Edit</Button>
                    <Button
                      onClick={() => deleteDataFunc(item)}
                      style={{ background: "#f44336" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableDiv>
        <Models>
          {addDataModel && (
            <AddDataModel>
              <button className="close" onClick={() => setAddDataModel(false)}>
                X
              </button>
              <div className="addDataFrom">
                <lable className="lable">Name</lable>
                <TextField
                  className="textfield"
                  name="name"
                  type="text"
                  value={user.name}
                  onChange={handleInput}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  margin="dense"
                  autoComplete="off"
                  error={error.name.status}
                  helperText={error.name.status && error.name.text}
                />
                <lable>Email</lable>
                <TextField
                  name="email"
                  type="text"
                  value={user.email}
                  onChange={handleInput}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  margin="dense"
                  autoComplete="off"
                  error={error.email.status}
                  helperText={error.email.status && error.email.text}
                />

                <lable>Phone</lable>
                <TextField
                  name="phone"
                  type="number"
                  value={user.phone}
                  onChange={handleInput}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  margin="dense"
                  autoComplete="off"
                  error={error.phone.status}
                  helperText={error.phone.status && error.phone.text}
                />

                <Button
                  onClick={() => addDataFunc()}
                  style={{ margin: "0.5rem 0", width: "100%" }}
                >
                  Add Data
                </Button>
              </div>
            </AddDataModel>
          )}

          {editDataModel && (
            <EditDataModel>
              <button className="close" onClick={() => setEditDataModel(false)}>
                X
              </button>
              <div className="addDataFrom">
                <lable className="lable">Name</lable>
                <TextField
                  className="textfield"
                  name="name"
                  type="text"
                  value={currentData.name}
                  onChange={editHandleInput}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  margin="dense"
                  autoComplete="off"
                />
                <lable>Email</lable>
                <TextField
                  name="email"
                  type="text"
                  value={currentData.email}
                  onChange={editHandleInput}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  margin="dense"
                  autoComplete="off"
                />

                <lable>Phone</lable>
                <TextField
                  name="phone"
                  type="number"
                  value={currentData.phone}
                  onChange={editHandleInput}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  margin="dense"
                  autoComplete="off"
                />

                <Button
                  onClick={() => editData()}
                  style={{ margin: "0.5rem 0", width: "100%" }}
                >
                  Edit Data
                </Button>
              </div>
            </EditDataModel>
          )}
        </Models>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const Head = styled.div`
  height: 10vh;
  width: 98%;
  margin: 1% 1% 0 1%;
  padding: 1%;
  background: #d3d3d3;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TableDiv = styled.div`
  width: 98%;
  margin: 0 1%;
  border: 1px solid #d3d3d3;
`;

const Models = styled.div`
  display: grid;
  place-items: center;
`;

const AddDataModel = styled.div`
  width: 20rem;
  height: 50vh;
  border: 1px solid grey;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 0.5rem;
  .close {
    position: absolute;
    top: -3%;
    right: -3%;
    padding: 0.2rem 0.4rem;
    border-radius: 50%;
  }
  .addDataFrom {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }
`;

const EditDataModel = styled.div`
  width: 20rem;
  height: 50vh;
  border: 1px solid grey;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 0.5rem;
  .close {
    position: absolute;
    top: -3%;
    right: -3%;
    padding: 0.2rem 0.4rem;
    border-radius: 50%;
  }
  .addDataFrom {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }
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

export default CRUD;
