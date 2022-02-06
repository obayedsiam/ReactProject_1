import React from "react";
import { useState, useEffect } from "react";
import base_url from "../api/bootapi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Table, Row, Col } from "reactstrap";
import { confirmAlert } from "react-confirm-alert";
import TvDetails from "./TvDetails";
import { Link } from "react-router-dom";

const Search = (props) => {
  const [data, setData] = useState({});
  const [value, setValue] = useState("");
  const [parameter, setParameter] = useState("Cat");
  const [date, setDate] = useState("");
  const [exportUrl, setExportUrl] = useState("null");
  const [exportUrlValue, setExportUrlValue] = useState("null");
  const [searchObject, setSearchObject] = useState({
    searchUrl: exportUrl,
    searchValue: exportUrlValue,
  });

  //console.log(courseList, "coureseList first")
  const headers = [
    "#",
    "Serial Number",
    "Phone Number",
    "Date of Call",
    "Call Status",
    "Actions",
  ];
  useEffect(() => {
    document.title = "Customer Details";
    console.log("entered into use effect");
    getALLDetails();
  }, []);

  const exportFile = () => {
    console.log("printing data", data);
    console.log("printing data", data);
    axios({
      url: `${base_url}/users/export/excel`, //your url
      method: "GET",
      params: {
        searchUrl: exportUrl,
        searchValue: exportUrlValue,
      },
      responseType: "blob", // important
    }).then(
      (response) => {
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        var fileName = "Customer List" + date + " " + time + ".xlsx";

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); //or any other extension
        document.body.appendChild(link);
        link.click();
      },
      (error) => {
        console.log(error, "Found error from your code");
        toast.error("Couldn't load Data");
      }
    );
  };

  const getALLDetails = () => {
    axios.get(`${base_url}/TvDetails`).then(
      (response) => {
        console.log(response.data, "Successfull");
        setData(response.data);
        {
          response.data.length > 0
            ? toast.success("Data Loaded !!")
            : toast.success("No Data Found");
        }
      },
      (error) => {
        console.log(error, "Found error from your code");
        toast.error("Couldn't load Data");
      }
    );
  };

  const updateAfterDelete = () => {
    console.log("deleted");
    //  setReload(true);
  };

  const searchDateWiseResult = () => {
    //setExportUrl(`${base_url}/getList/date/${date}`);

    setExportUrl("/getList/date/");
    setExportUrlValue(`${date}`);

    axios.get(`${base_url}/getList/date/${date}`).then(
      (response) => {
        setData(response.data);
        console.log(response.data, "Successfull");
      },
      (error) => {
        console.log(error, "Found error from your code");
        toast.error("Couldn't load Data");
      }
    );
  };

  const searchData = () => {
    var urlExtension = "";
    if (value !== "Cat") {
      switch (value) {
        case "1":
          urlExtension = "/getList/id/";
          break;
        case "2":
          urlExtension = "/getList/serial/";
          break;
        case "3":
          urlExtension = "/getList/mobile/";
          break;
        case "4":
          urlExtension = "/getList/callStatus/";
          break;
        case "5":
          urlExtension = "/getListForLast/";
          break;
        case "All":
          urlExtension = "/TvDetails";
          setExportUrl("null");
          setExportUrlValue("null");
          setParameter("");
          break;
        default:
          break;
      }

      setExportUrl(`${urlExtension}`);
      setExportUrlValue(`${parameter}`);

      let finalUrl = `${base_url}${urlExtension}${parameter}`;
      console.log("Printing Final Url ", finalUrl);

      // setExportUrl(finalUrl);
      axios.get(finalUrl).then(
        (response) => {
          console.log(response.data, "Successfull");
          setData(response.data);
          {
            response.data.length > 0
              ? toast.success("Data Loaded !!")
              : toast.success("No Data Found");
          }
        },
        (error) => {
          console.log(error, "Found error from your code");
          toast.error("Search Filter and Field Value Mismached");
        }
      );
    }
  };

  const update = () => {
    console.log("Printing in update after delete");
    axios.get(`${base_url}/TvDetails`).then(
      (response) => {
        console.log("Course Added");
        setData(response.data);
        //  update(course.id);
        //  toast.success("Deleted");
      },
      (error) => {
        toast.error("Error occured");
      }
    );

    // update();
  };

  return (
    <div>
      <ToastContainer />
      <h1>Customer Details</h1>
      <Col md={6}>
        <div className="rowC">
          <select
            onChange={(e) => {
              setValue(e.target.value);
            }}
            style={{ height: "100%", width: "100%" }}
          >
            <option value="Cat">Select Search Filter</option>
            <option value="All">All Customer</option>
            <option value="2">Serial Number</option>
            <option value="3">Phone Number</option>
            <option value="4">Call Status</option>
            <option value="5">Previous "X" Days</option>
          </select>
          <input
            onChange={(e) => {
              setParameter(e.target.value.trim());
            }}
          ></input>

          <button onClick={searchData} style={{ PaddingRight: "80px" }}>
            Search{" "}
          </button>
        </div>

        <div className="rowC">
          <label>Date </label>
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          ></input>
          <button
            onClick={searchDateWiseResult}
            style={{ PaddingRight: "80px" }}
          >
            Search{" "}
          </button>
        </div>
        <div className="rowC">
          <button onClick={exportFile}>Export</button>
        </div>
      </Col>
      <p>List of customers</p>

      {/* {data && data.length > 0
        ? data.map((item, key) => (
            <Course course={item} update={updateAfterDelete} />
          ))} */}

      <Table striped bordered hover variant>
        <thead>
          <tr>
            {headers.map((head) => (
              <th>{head}</th>
            ))}
          </tr>
        </thead>
        {data && data.length > 0
          ? data.map((item, key) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.serialNumber}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.date}</td>
                <td>{item.callStatus}</td>
                <td>
                  {/* <Link
                    to={`/Edit/${item.serialNumber}/${item.mobileNumber}/${item.date}/${item.callStatus}/${item.id}`}
                  >
                    <button type="button">Edit</button>
                  </Link> */}
                  <Link to={`/edit/${item.id}`}>
                    <button type="button">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      axios
                        .delete(`${base_url}/TvDetails/delete/${item.id}`)
                        .then(
                          (response) => {
                            console.log("Course Added");
                            update();
                            toast.success("Deleted");
                          },
                          (error) => {
                            toast.error("Error occured");
                          }
                        );
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          : "No Customers Found"}
      </Table>
    </div>
  );
};

export default Search;
