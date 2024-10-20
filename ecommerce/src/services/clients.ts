import axios from "axios";

const service = axios.create({
  baseURL: "https://api.freeapi.app/api/v1",
  //   headers: {
  //     Authorization: "Bearer YOUR_API_TOKEN",
  //   },
});

export default service;
