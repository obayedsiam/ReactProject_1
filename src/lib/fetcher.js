import Cookies from "js-cookies";
import axios from "axios";

const fetcher = async (url, options = {}) => {
  
    // const url = new URL(`${protocol}://${baseUrl}/${route}`);
    const method = options.method || "get";

    if (method === "get" || method === "GET") {
      console.log("Entered into method condition");
      Object.keys(options).forEach((key) =>
        url.searchParams.append(key, options[key])
      );
    }
  
//  axios.get(url).then(
//       (response) => {
//         console.log(response.data, "Successfull");
//      //   ret = response.data;
//      //   console.log(ret, "ret inside axios")
//         return response.data;
//       //  setCourses(response.data);
//         {
//           // response.data.length > 0
//           //   ? toast.success("All Course Loaded !!")
//           //   : toast.success("No Courses Found");
//         }
//       },
//       (error) => {
//         console.log(error, "Found error from your code");
//       //  toast.error("Couldn't load Data");
//       }
//     );

// const ret = await axios.get(url).then((res) => {
//   console.log(res.data, "res.data printing inside axios");
//   return res.data;
// })
// .catch(() => {
//   console.log("fail");
// });




    const response = await fetch(url, {
        headers: {
           "Content-Type": "application/json; charset=utf-8",
          ...options.header,
        },
      ...options,
    })
    // .then(res=>{
    //  console.log(res.json(), "printing response inside then")
    // })
   // const ret = response.json();
  // const {PromiseResult} = response.json().Promise;
   const ret = response.json();
   console.log(ret, "ret inside fetcher");
 // const ret2 = JSON.parse(ret); 
 //  console.log(ret, "final ret inside fetcher");
   return ret;
  };
  
  export default fetcher;
  