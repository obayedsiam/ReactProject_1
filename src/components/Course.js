import React, { Component, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
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
  const btnHandler = () => {
    axios.delete(`${base_url}/course/${course.id}`).then(
      (response) => {
        console.log("Course Added");
        update(course.id);
        toast.success("Deleted");
      },
      (error) => {
        toast.error("Error occured");
      }
    );
  };

  return (
    <div>
      <ToastContainer />
      <Card className="text-center">
        <CardBody>
          <CardSubtitle className="fw-bold"> {course.title}</CardSubtitle>
          <CardText>{course.description}</CardText>
          <Container className="text-center">
            <Button color="danger" onClick={btnHandler}>
              Delete
            </Button>
            <Button color="warning ms-3">Update</Button>
          </Container>
        </CardBody>
      </Card>
    </div>
  );
};

export default Course;
