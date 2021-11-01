import React from "react";
import Course from "./Course";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import base_url from "../api/bootapi";
import axios from "axios";
import { callApi, selectApi } from '../Reducers/apiSlice';
import { ToastContainer, toast } from "react-toastify";
import { Button, Input, Container } from "reactstrap";

const Allcourses = () => {
  const [courses, setCourses] = useState({ title: "", description: "" });

   const {courseList} = useSelector(selectApi);
   console.log(courseList, "printing courselist");
   const dispatch = useDispatch();
   //console.log(courseList, "cpokhdfkg");

 

  // { title: "Java ", description: "This is a Java Course" },
  // { title: "React", description: "This is a React Course" },
  // { title: "Django", description: "This is a Django Course" },

  useEffect(() => {
    document.title = "Courses";
    //console.log(callApi, "printing call api function");
    getALLCourses();
    
  }, []);

  const getALLCourses = () => {
  //  console.log("Entered into get all course ");
     dispatch(
      callApi({
        operationId : `${base_url}/course`,
        output: "courseList",
      }
    )
    )
    // axios.get(`${base_url}/course`).then(
    //   (response) => {
    //     console.log(response.data, "Successfull");
    //     setCourses(response.data);
    //     {
    //       response.data.length > 0
    //         ? toast.success("All Course Loaded !!")
    //         : toast.success("No Courses Found");
    //     }
    //   },
    //   (error) => {
    //     console.log(error, "Found error from your code");
    //     toast.error("Couldn't load Data");
    //   }
    // );
  };

  const updateAfterDelete = (id) => {
  //  setCourses(courses.filter((c) => c.id != id));
  };

  return (
    <div>
      <ToastContainer />
      <h1>All Courses</h1>
      <p>List of courses are as follows</p>
      {courseList && courseList.length > 0
        ? courseList.map((item, key) => (
            <Course course={item} update={updateAfterDelete} />
          ))
        : "No Courses"}
    </div>
  );
};

export default Allcourses;
