import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { callApi, selectApi } from "../Reducers/apiSlice";
import { Link } from "react-router-dom";
import base_url from "../api/bootapi";
import { useSelector, useDispatch } from "react-redux";
import EditCourse from "./EditCourse";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
  Button,
  Container,
} from "reactstrap";

import { ToastContainer, toast } from "react-toastify";

const Course = ({ course, update }) => {
  const dispatch = useDispatch();

  const [deleted, setDeleted] = useState("False");

  useEffect(() => {
    document.title = "Course List";
    //console.log(callApi, "printing call api function");
    update();
    setDeleted("False");
  }, [deleted]);

  const btnHandler = () => {
    dispatch(
      callApi({
        operationId: `${base_url}/course/delete/${course.id}`,
        output: "delete",
        parameters: {
          method: "DELETE",
        },
      })
    );
    update();
    // axios.delete(`${base_url}/course/${course.id}`).then(
    //   (response) => {
    //     console.log("Course Added");
    //     update(course.id);
    //     toast.success("Deleted");
    //   },
    //   (error) => {
    //     toast.error("Error occured");
    //   }
    // );
  };

  return (
    <div>
      <ToastContainer />
      <Card className="text-center">
        <CardBody>
          <CardSubtitle className="fw-bold"> {course.title}</CardSubtitle>
          <CardText>{course.description}</CardText>
          <Container className="text-center">
            <Button onClick={btnHandler}>
              {/* color="danger"  */}
              Delete
            </Button>
            <Link to={`/edit-course/${course.id}`}>
              <Button>
                {/* color="warning ms-3" */}
                Update
              </Button>
            </Link>
          </Container>
        </CardBody>
      </Card>
    </div>
  );
};

export default Course;
