import axios from "axios";
import BASE_URL from "../config/config";

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
    return axios.post(`${API_URL}/save`, authorData);
  },

updateAuthor: (authorData) => {
  return axios.put(`${API_URL}/update`, authorData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
},
deleteAuthor: (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
},

getAllAuthors: (search = '') => {
  return axios.get(`${API_URL}/all`, {
    params: { search }
  })
}

};

export default AuthorAPI;
