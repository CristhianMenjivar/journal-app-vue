import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://vue-demos-803df-default-rtdb.firebaseio.com",
});

export default journalApi;
