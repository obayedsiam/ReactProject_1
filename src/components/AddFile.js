import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, Fragment } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../Reducers/apiSlice";
import axios from "axios";
import base_url from "../api/bootapi";
import "react-toastify/dist/ReactToastify.css";

const AddFile = () => {
  const [file, setFile] = useState({});

  useEffect(() => {
    document.title = "Add Course";
  }, []);

  const courseHandler = (e) => {
    console.log(file, "Entered into courseHandler function ");
    var formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${base_url}/TvDetails/upload`, formData)
      .then((response) => {
        // console.log(data, "Course input");
        console.log(response, "Course Added");
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error, "error");
        toast.error("Select an .xlsx file");
      });
  };

  return (
    <form>
      <ToastContainer></ToastContainer>
      <label>Select File </label>
      <input
        type="file"
        name="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button type="button" onClick={courseHandler}>
        Upload
      </button>
    </form>
  );
};

export default AddFile;
