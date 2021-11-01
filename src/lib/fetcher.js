import Cookies from "js-cookies";

const fetcher = async (url, options = {}) => {
    // const url = new URL(`${protocol}://${baseUrl}/${route}`);
    const method = options.method || "get";
  
    if (method === "get" || method === "GET") {
       
      Object.keys(options).forEach((key) =>
        url.searchParams.append(key, options[key])
      );
    }
  
    const response = await fetch(url, {
      headers: {
        // 'Authorization': `Bearer ${auth.getToken()}`,
        // Authorization: 'Bearer ' + Cookies.get("access_token"),
        // "Content-Type": "application/json; charset=utf-8",
        ...options.header,
      },
      ...options,
    });

    return response.json();
  };
  
  export default fetcher;
  