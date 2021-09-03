import { computed } from "vue";
import { useStore } from "vuex";

const useAuth = () => {
  const store = useStore();

  // action create account
  const createUser = async (user) => {
    const res = await store.dispatch("auth/createUser", user);
    return res;
  };

  // action login user
  const loginUser = async (user) => {
    const res = await store.dispatch("auth/singInUser", user);
    return res;
  };

  const checkAuthentication = async () => {
    const res = await store.dispatch("auth/checkAuthentication");
    return res;
  };

  const logout = () => {
    store.commit("auth/logout");
    store.commit("journal/clearEntries");
  };

  return {
    createUser,
    loginUser,
    checkAuthentication,
    logout,

    authStatus: computed(() => store.getters["auth/currentStatus"]),
    currentUser: computed(() => store.getters["auth/currentUser"]),
  };
};

export default useAuth;
