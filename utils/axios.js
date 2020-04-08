import axios from "axios";

export default axios.create({
  baseURL: `http://192.168.8.105:5010/api/v1`,
});
