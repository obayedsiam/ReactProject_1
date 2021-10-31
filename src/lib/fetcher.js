import Cookies from "js-cookies";

const fetcher = async (url, options = {} )=>{

    const method = options.method || "get";
    if(method === "get" || method === "GET"){
        Object.keys(options).forEach((key)=>{
            url.searchParams.append(key, options[key])
        })
    }

}

export default fetcher;