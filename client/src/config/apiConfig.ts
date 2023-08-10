import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000", //dodać do env, nie działa ???
});
