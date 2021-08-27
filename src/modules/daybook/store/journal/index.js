import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";
import state from "./state";

const journal = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export default journal;
