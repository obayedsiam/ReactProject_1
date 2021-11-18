import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { callApi } from "../Reducers/apiSlice";
import axios from "axios";
import base_url from "../api/bootapi";
import "react-toastify/dist/ReactToastify.css";

const EditCourse = (props) => {
  // console.log("Edit Course opened");

  const dispatch = useDispatch();
  const [course, setCourse] = useState(props);

  useEffect(() => {
    document.title = "Update Course";
    getCourses();
  }, []);

  const getCourses = () => {
    console.log(`${props.match.params.id}`, "reached to getcourse");
    axios.get(`${base_url}/course/${props.match.params.id}`).then(
      (response) => {
        console.log(response.data, "Successfull");
        setCourse(response.data);
        //   toast.success("Course Loaded !!");
      },
      (error) => {
        console.log(error, "Found error from your code");
        toast.error("Couldn't load Data");
      }
    );
  };

  const courseUpdateHandler = (e) => {
    setCourse({ ...course, id: props.id });
    //    toast.success("Course Added");
    console.log(course, "Submitted");
    updateDatatoServer(course);
    e.preventDefault();
  };

  const updateDatatoServer = (data) => {

    dispatch(callApi({
      operationId : `${base_url}/course/edit/${props.match.params.id}`,
      output: "courseList",
      parameters: {
        method : "PUT",
        body: JSON.stringify(data)
      }
    }))

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
      <h1 className="text-center my=3">Update Course</h1>
      <Form onSubmit={courseUpdateHandler}>
        {/* <FormGroup>
          <label htmlFor="userId">User Id</label>
          <Input
            type="text"
            name="userId"
            placeholder={data.id}
            id="UserId"
            onChange={(e) => {
              setCourse({ ...course, id: e.target.value });
              //  console.log(course, "Id changed");
            }}
          />
        </FormGroup> */}
        <FormGroup>
          <label htmlFor="title">Course title </label>
          <Input
            type="text"
            placeholder=""
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
            // value={`${course.description}`}
            id="description"
            onChange={(e) => {
              setCourse({ ...course, description: e.target.value });
            }}
          ></Input>
        </FormGroup>

        <Container className="text-center my-3">
          <ToastContainer />
          <Button color="success" type="submit">
            Update Course
          </Button>
          <Button color="warning ms-2" type="reset">
            Clear
          </Button>
        </Container>
      </Form>
    </Fragment>
  );
};

export default EditCourse;
