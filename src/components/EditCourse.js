import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { callApi, selectApi } from "../Reducers/apiSlice";
import axios from "axios";
import base_url from "../api/bootapi";
import useListApi from "./useListApi";
import "react-toastify/dist/ReactToastify.css";

const EditCourse = (props) => {
  const dispatch = useDispatch();
  const [course, setCourse] = useState({ id: "", title: "", description: "" });
  //const [field, setField] = useState(false);

  const tableProps = {
    // headers: [
    //   { id: "id", label: "#" },
    //   { id: "title", label: "title" },
    //   { id: "description", label: "description" },
    // ],
    config: {
      operationId: `${base_url}/course/${props.match.params.id}`,
      output: "addedCourse",
    },
  };

  const { data } = useListApi(tableProps.config);
  console.log(data, "printing data in edit Course");

  useEffect(() => {
    document.title = "Update Course";
    getCourse(course);
    console.log("use effect called course)", course);
    //  console.log("printing data",course);
  }, [course]);

  useEffect(() => {
    document.title = "Update Course";
    getCourse(data);
    console.log("use effect called data", data);
  }, [data]);

  // console.log("printing data", data);
  //  console.log("printing course", course);

  const getCourse = (value) => {
    setCourse(value);

    // dispatch(callApi({
    //   operationId : `${base_url}/course/${props.match.params.id}`,
    //   output: "courseList",
    //   // parameters: {
    //   //   method : "GET",
    //   //}
    // }))

    //   setCourse(data);
    //   axios.get(`${base_url}/course/${props.match.params.id}`).then(
    //     (response) => {
    //       console.log(response.data, "Successfull");
    //       setCourse(response.data);
    //       //   toast.success("Course Loaded !!");
    //     },
    //     (error) => {
    //       console.log(error, "Found error from your code");
    //       toast.error("Couldn't load Data");
    //     }
    //   );
  };

  // console.log(course, "reached after getcourse");
  const courseUpdateHandler = (e) => {
    //  setType(true);
    //  setCourse({ ...course,});
    //  toast.success("Course Added");
    console.log(course, "Submitted");
    updateDatatoServer(course);
    e.preventDefault();
  };

  const updateDatatoServer = (data) => {
    console.log(course, "Submitted server");
    dispatch(
      callApi({
        operationId: `${base_url}/course/edit/${props.match.params.id}`,
        output: "addedCourse",
        parameters: {
          method: "PUT",
          body: JSON.stringify(data),
        },
      })
    );
    // axios
    //   .put(`${base_url}/course/${props.match.params.id}`, data)
    //   .then((response) => {
    //     console.log(response);
    //     console.log(response, "Course updated");
    //     toast.success("Course updated");
    //   })
    //   .catch((error) => {
    //     toast.error("Error occured");
    //   });
  };

  return (
    <Fragment>
      {/* <h1 className="text-center my=3">Update Course</h1> */}
      <Form onSubmit={courseUpdateHandler}>
        <FormGroup>
          <label htmlFor="userId">User Id</label>
          <Input
            type="text"
            name="userId"
            placeholder={course.id}
            value={course.id}
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
            placeholder={course.title}
            name="title"
            id="title"
            value={course.title}
            onChange={(e) => {
              setCourse({ ...course, title: e.target.value });
            }}
          />
        </FormGroup>
        <FormGroup>
          <label>Description</label>
          <Input
            type="textarea"
            placeholder={course.description}
            value={course.description}
            id="description"
            onChange={(e) => {
              setCourse({ ...course, description: e.target.value });
            }}
          ></Input>
        </FormGroup>

        <Container className="text-center my-3">
          <ToastContainer />
          <Button type="submit">Update Course</Button>

          <Button type="reset">Clear</Button>
        </Container>
      </Form>
    </Fragment>
  );
};

export default EditCourse;
