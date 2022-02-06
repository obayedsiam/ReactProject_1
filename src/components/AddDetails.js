import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, Fragment } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../Reducers/apiSlice";
import axios from "axios";
import base_url from "../api/bootapi";
import "react-toastify/dist/ReactToastify.css";
//import { call } from "@redux-saga/core/effects";

const AddDetails = () => {
  useEffect(() => {
    document.title = "Add Customer Details";
  }, []);

  const [details, setDetails] = useState({
    serial: "",
    date: "",
    mobile: "",
    call: "",
  });

  const postDatatoServer = () => {
    axios
      .post(`${base_url}/TvDetails`, details)
      .then((response) => {
        //  console.log(data, "Course input");
        //   console.log(response, "Course Added");
        toast.success("Customer Added");
      })
      .catch((error) => {
        toast.error("Error occured");
      });
  };

  return (
    <Fragment>
      {/* <h1 className="text-center my=3">Fill up the form </h1> */}
      <Form onSubmit={postDatatoServer}>
        <FormGroup>
          <label htmlFor="Serial">Serial Number</label>
          <Input
            type="text"
            name="serial"
            placeholder={details.serial}
            id="serial"
            onChange={(e) => {
              setDetails({ ...details, serial: e.target.value });
              //  console.log(course, "Id changed");
            }}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="title">Mobile Number </label>
          <Input
            type="text"
            placeholder="Mobile Number"
            name="mobile"
            id="mobile"
            onChange={(e) => {
              setDetails({ ...details, mobile: e.target.value });
            }}
          />
        </FormGroup>
        <FormGroup>
          <label>Call Status</label>
          <Input
            type="text"
            placeholder="Call Status"
            id="call"
            onChange={(e) => {
              setDetails({ ...details, call: e.target.value });
            }}
          ></Input>
        </FormGroup>
        <FormGroup>
          <label>Date of Contact</label>
          <Input
            type="date"
            placeholder="Date"
            id="date"
            onChange={(e) => {
              setDetails({ ...details, date: e.target.value });
            }}
          ></Input>
        </FormGroup>

        <Container className="text-center my-3">
          <ToastContainer />
          <button type="submit">Save</button>
        </Container>
      </Form>
    </Fragment>
  );
};

export default AddDetails;
