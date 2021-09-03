import axios from "axios";

const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
  params: {
    key: "AIzaSyAKiajvl_nbXygIfCyhfuX7FRb6o1LcsM4",
  },
});

// crear usuario => :signUp?key=[API_KEY]

export default authApi;
