import React from "react";
import Course from "./Course";
import { useState } from "react";

const Allcourses = () => {
  const [courses, setCourses] = useState([
    { title: "Java ", description: "This is a Java Course" },
    { title: "React", description: "This is a React Course" },
    { title: "Django", description: "This is a Django Course" },
  ]);

  return (
    <div>
      <h1>All Courses</h1>
      <p>List of courses are as follows</p>
      {courses.length > 0 ? courses.map((item) => (
          <Course course = {item}/>
      )) : "No Courses"}
    </div>
  );
};

export default Allcourses;
