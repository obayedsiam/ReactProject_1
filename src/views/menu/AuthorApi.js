import axios from "axios";
import BASE_URL from "../../config.js";

const API_URL = `${BASE_URL}/writer`;

const AuthorAPI = {
  
  getAuthors: (page = 0, size = 10, sortBy = "id", sortDirection = "asc", search = "") => {
    const params = {
      page,
      size,
      sortBy,
      sortDirection,
      search,
    };
    return axios.get(`${API_URL}/list`, { params });
  },

  getAuthorById: (authorId) => {
    return axios.get(`${API_URL}/find/${authorId}`);
  },

  addAuthor: (authorData) => {
    return axios.post(`${API_URL}/add`, authorData);
  },

  updateAuthor: (authorId, authorData) => {
    return axios.put(`${API_URL}/update/${authorId}`, authorData);
  },

};

export default AuthorAPI;
