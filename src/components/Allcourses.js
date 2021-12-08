import React from "react";
import Course from "./Course";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import base_url from "../api/bootapi";
//import axios from "axios";
import { callApi, selectApi } from "../Reducers/apiSlice";
import { ToastContainer, toast } from "react-toastify";
//import { Button, Input, Container } from "reactstrap";
import useListApi from "./useListApi";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Allcourses = (props) => {
  //const [courses, setCourses] = useState({ id: 0, title: "", description: "" });
  const [reload, setReload] = useState(false);
  //  const weatherApi = "current.json?key=e94b9f8a2f354578ba264530210211&q=London&aqi=no";

  const tableProps = {
    headers: [
      { id: "id", label: "#" },
      { id: "title", label: "title" },
      { id: "description", label: "description" },
    ],
    config: {
      operationId: `${base_url}/course`,
      output: "courseList",
    },
  };

  //const {courseList} = useSelector(selectApi);

  const { data } = useListApi(tableProps.config);
  console.log("data reloaded", data);

  const dispatch = useDispatch();
  // console.log(data, "cpokhdfkg");

  //console.log(data, "printing data");

  // { title: "Java ", description: "This is a Java Course" },
  // { title: "React", description: "This is a React Course" },
  // { title: "Django", description: "This is a Django Course" },

  useEffect(() => {
    document.title = "Course List";
    //console.log(callApi, "printing call api function");
    // getALLCourses();
  });

  useEffect(() => {
    document.title = "Course List";
    console.log("entered into use effect");
    dispatch(
      callApi({
        operationId: `${base_url}/course`,
        output: "courseList",
      })
    );
    //   getALLCourses();
    setReload(false);
  }, [reload]);

  //console.log(courseList, "coureseList first")

  const getALLCourses = () => {
    //console.log("Entered into get all course ");
    dispatch(
      callApi({
        operationId: `${base_url}/course`,
        output: "courseList",
      })
    );

    //   axios.get(`${base_url}/course`).then(
    //     (response) => {
    //       console.log(response.data, "Successfull");
    //       setCourses(response.data);
    //       {
    //         response.data.length > 0
    //           ? toast.success("All Course Loaded !!")
    //           : toast.success("No Courses Found");
    //       }
    //     },
    //     (error) => {
    //       console.log(error, "Found error from your code");
    //       toast.error("Couldn't load Data");
    //     }
    //   );

    //console.log(courseList, "printing courselist");
  };

  //console.log(ret, "printing courseList");

  const updateAfterDelete = () => {
    console.log("deleted");
    setReload(true);
  };

  return (
    <div>
      <ToastContainer />
      {/* <h1>All Courses</h1>
      <p>List of courses are as follows</p> */}
      {data && data.length > 0
        ? data.map((item, key) => (
            <Course course={item} update={updateAfterDelete} />
          ))
        : "No Courses"}
    </div>
  );
};

export default Allcourses;
