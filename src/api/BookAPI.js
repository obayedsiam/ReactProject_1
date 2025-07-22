import axios from "axios";
import BASE_URL from "../config/config";

const API_URL = `${BASE_URL}/book`;

const BookAPI = {
  
  getBooks: (page = 0, size = 10, sortBy = "id", sortDirection = "asc", search = "") => {
    const params = {
      page,
      size,
      sortBy,
      sortDirection,
      search,
    };
    return axios.get(`${API_URL}/list`, { params });
  },

  getBookById: (bookId) => {
    return axios.get(`${API_URL}/find/${bookId}`);
  },

  addBook: (bookData) => {
    return axios.post(`${API_URL}/save`, bookData);
  },

updateBook: (bookData) => {
  return axios.put(`${API_URL}/update`, bookData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
},
deleteBook: (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
},

getAllBooks: (search = '') => {
  return axios.get(`${API_URL}/all`, {
    params: { search }
  })
}

};

export default BookAPI;
