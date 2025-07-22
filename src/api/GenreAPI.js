import axios from "axios";
import BASE_URL from "../config/config";

const API_URL = `${BASE_URL}/genre`;

const GenreAPI = {
  
  getGenres: (page = 0, size = 10, sortBy = "id", sortDirection = "asc", search = "") => {
    const params = {
      page,
      size,
      sortBy,
      sortDirection,
      search,
    };
    return axios.get(`${API_URL}/list`, { params });
  },

  getGenreById: (GenreId) => {
    return axios.get(`${API_URL}/find/${GenreId}`);
  },

  addGenre: (GenreData) => {
    return axios.post(`${API_URL}/save`, GenreData);
  },

updateGenre: (GenreData) => {
  return axios.put(`${API_URL}/update`, GenreData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
},
deleteGenre: (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
},

getAllGenres: (search = '') => {
  return axios.get(`${API_URL}/all`, {
    params: { search }
  })
}

};

export default GenreAPI;
