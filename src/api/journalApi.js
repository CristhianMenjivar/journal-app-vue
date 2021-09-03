import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://vue-demos-803df-default-rtdb.firebaseio.com",
});

// el interceptor se ejecutara en cada request
journalApi.interceptors.request.use((config) => {
  config.params = {
    auth: localStorage.getItem("idToken"),
  };

  // si el backend pide header authentication
  // config.headers = {
  //   authorization: localStorage.getItem("idToken"),
  // };

  return config;
});

export default journalApi;
