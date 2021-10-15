import React from "react";
import Course from "./Course";
import { useState, useEffect } from "react";
import base_url from "../api/bootapi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, Input, Container } from "reactstrap";

const Allcourses = () => {
  const [courses, setCourses] = useState({ title: "", description: "" });

  // { title: "Java ", description: "This is a Java Course" },
  // { title: "React", description: "This is a React Course" },
  // { title: "Django", description: "This is a Django Course" },

  useEffect(() => {
    document.title = "Courses";
    getALLCourses();
  }, []);

  const getALLCourses = () => {
    axios.get(`${base_url}/course`).then(
      (response) => {
        console.log(response.data, "Successfull");
        setCourses(response.data);
        {
          response.data.length > 0
            ? toast.success("All Course Loaded !!")
            : toast.success("No Courses Found");
        }
      },
      (error) => {
        console.log(error, "Found error from your code");
        toast.error("Couldn't load Data");
      }
    );
  };

  const updateAfterDelete = (id) => {
    setCourses(courses.filter((c) => c.id != id));
  };

  return (
    <div>
      <ToastContainer />
      <h1>All Courses</h1>
      <p>List of courses are as follows</p>
      {courses.length > 0
        ? courses.map((item, key) => (
            <Course course={item} update={updateAfterDelete} />
          ))
        : "No Courses"}
    </div>
  );
};

export default Allcourses;
