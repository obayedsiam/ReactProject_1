import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { callApi, selectApi } from "../Reducers/apiSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import base_url from "../api/bootapi";

import "react-toastify/dist/ReactToastify.css";

const TvDetails = (props) => {
  console.log(props, "pppp");

  const [details, setDetails] = useState({
    id: "",
    serialNumber: "",
    date: "",
    mobileNumber: "",
    callStatus: "",
  });

  const [data, setData] = useState({});

  const tableProps = {
    config: {
      operationId: `${base_url}/course/${props.match.params.id}`,
      output: "addedCourse",
    },
  };

  //   useEffect(() => {
  //     document.title = "Update Course";
  //     //  getCourse(course);
  //  //   console.log("use effect called course)", course);
  //     //  console.log("printing data",course);
  //   }, [course]);

  useEffect(() => {
    document.title = "Update Course";
    getALLDetails();

    setDetails({
      ...details,
      id: props.match.params.id,
      serialNumber: props.match.params.serial,
      date: props.match.params.date,
      mobileNumber: props.match.params.mobile,
      callStatus: props.match.params.call,
    });

    setData({
      ...data,
      id: data.id,
      serialNumber: data.serialNumber,
      date: data.date,
      mobileNumber: data.mobileNumber,
      callStatus: data.callStatus,
    });
  }, []);

  const getALLDetails = () => {
    axios.get(`${base_url}/getList/id/${props.match.params.id}`).then(
      (response) => {
        console.log(response.data, "Successfull");
        setData(response.data);
        // {
        //   response.data.length > 0
        //     ? toast.success("Data Loaded !!")
        //     : toast.success("No Data Found");
        // }
      },
      (error) => {
        console.log(error, "Found error from your code");
        toast.error("Couldn't load Data");
      }
    );
  };

  // console.log("printing data", data);
  //  console.log("printing course", course);

  const getCourse = (value) => {
    // setCourse(value);
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
    // console.log(course, "Submitted");
    //  updateDatatoServer(course);
    e.preventDefault();
  };

  const updateDatatoServer = () => {
    axios
      .put(`${base_url}/TvDetails/edit/${props.match.params.id}`, details)
      .then((response) => {
        console.log(response);
        console.log(response, " updated");
        toast.success("Details updated");
      })
      .catch((error) => {
        toast.error("Error occured");
      });
  };

  return (
    <Fragment>
      {/* <h1 className="text-center my=3">Update Course</h1> */}
      <Form onSubmit={updateDatatoServer}>
        <FormGroup>
          <label htmlFor="serialNumber">Serial Number</label>
          <Input
            type="text"
            name="serialNumber"
            placeholder={props.match.params.serial}
            value={data.serialNumber}
            id="serialNumber"
            onChange={(e) => {
              setDetails({ ...details, serialNumber: e.target.value });
              //  console.log(course, "Id changed");
            }}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="mobile">Mobile Number</label>
          <Input
            type="text"
            placeholder={props.match.params.mobile}
            name="mobileNumber"
            id="mobile"
            value={details.mobileNumber}
            onChange={(e) => {
              setDetails({ ...details, mobileNumber: e.target.value });
            }}
          />
        </FormGroup>
        <FormGroup>
          <label>Call Status</label>
          <Input
            type="text"
            placeholder={props.match.params.call}
            value={details.callStatus}
            id="description"
            onChange={(e) => {
              setDetails({ ...details, callStatus: e.target.value });
            }}
          ></Input>
        </FormGroup>

        <FormGroup>
          <label>Call Status</label>
          <Input
            type="date"
            placeholder={Date.parse(props.match.params.date)}
            value={details.date}
            id="description"
            onChange={(e) => {
              setDetails({ ...details, date: e.target.value });
            }}
          ></Input>
        </FormGroup>

        <Container className="text-center my-3">
          <ToastContainer />
          <button type="submit">Update</button>
        </Container>
      </Form>
    </Fragment>
  );
};

export default TvDetails;
