import Cookies from "js-cookies";
import axios from "axios";
import base_url from "../api/bootapi";
import { ToastContainer, toast } from "react-toastify";

const fetcher = async (url, options = {}) => {
  // const url = new URL(`${protocol}://${baseUrl}/${route}`);
  const method = options.method || "get";

  if (options.method === "POST") {
    console.log(options.body, "printing options body");
  }

  if (method === "get" || method === "GET") {
    Object.keys(options).forEach((key) =>
      url.searchParams.append(key, options[key])
    );
  }

  const response = axios
    .post(`${base_url}/course`, options)
    .then((response) => {
      console.log(options.body, "Course input");
      console.log(response, "Course Added");
      toast.success("Course Added");
    })
    .catch((error) => {
      toast.error("Error occured");
    });

  // const response = await fetch(url, {
  //   header: {
  //     //   //   "Access-Control-Allow-Origin": "*",
  //     //   //   // 'Authorization': `Bearer ${auth.getToken()}`,
  //     //   //   // Authorization: 'Bearer ' + Cookies.get("access_token"),
  //     //"Content-Type": "application/json; charset=utf-8",
  //     ...options.header,
  //   },
  //   ...options,
  // });

  return response;
};

export default fetcher;
