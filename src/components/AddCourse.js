import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, Fragment } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../Reducers/apiSlice";
//import axios from "axios";
import base_url from "../api/bootapi";
import "react-toastify/dist/ReactToastify.css";
//import { call } from "@redux-saga/core/effects";

const AddCourse = () => {
  const dispatch = useDispatch();
  const { addedCourse } = useSelector(selectApi);

  useEffect(() => {
    document.title = "Add Course";
  }, []);

  const [course, setCourse] = useState({});

  const courseHandler = (e) => {
    //    toast.success("Course Added");
    console.log(course, "Submitted");
    postDatatoServer(course);
    e.preventDefault();
  };

  const postDatatoServer = (data) => {
    //  console.log(data, "Entered into post data to server function ");
    dispatch(
      callApi({
        operationId: `${base_url}/course`,
        output: "addedCourse",
        parameters: {
          header: {
            //    "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          method: "POST",
        },
      })
    );

    // axios
    //   .post(`${base_url}/course`, data)
    //   .then((response) => {
    //     console.log(data, "Course input");
    //     console.log(response, "Course Added");
    //     toast.success("Course Added");
    //   })
    //   .catch((error) => {
    //     toast.error("Error occured");
    //   });
  };

  return (
    <Fragment>
      {/* <h1 className="text-center my=3">Fill up the form </h1> */}
      <Form onSubmit={courseHandler}>
        <FormGroup>
          <label htmlFor="userId">User Id</label>
          <Input
            type="number"
            name="userId"
            placeholder="Enter Id"
            id="UserId"
            onChange={(e) => {
              setCourse({ ...course, id: e.target.value });
              //  console.log(course, "Id changed");
            }}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="title">Course title </label>
          <Input
            type="text"
            placeholder="Enter Course title"
            name="title"
            id="title"
            onChange={(e) => {
              setCourse({ ...course, title: e.target.value });
            }}
          />
        </FormGroup>
        <FormGroup>
          <label>Description</label>
          <Input
            type="textarea"
            placeholder="Enter Description"
            id="description"
            onChange={(e) => {
              setCourse({ ...course, description: e.target.value });
            }}
          ></Input>
        </FormGroup>

        <Container className="text-center my-3">
          <ToastContainer />
          <Button type="submit">
          {/* //color="success"   */}
            Add Course
          </Button>
          <Button type="reset">
          {/* color="warning ms-2"  */}
            Clear
          </Button>
        </Container>
      </Form>
    </Fragment>
  );
};

export default AddCourse;
