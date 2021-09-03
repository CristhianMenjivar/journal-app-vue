// debe ser el store global
import store from "@/store";

const isAuthenticatedGuard = async (_to, _from, next) => {
  const { ok, message } = await store.dispatch("auth/checkAuthentication");
  console.error(message);
  if (ok) next();
  else next({ name: "login" });
};

export default isAuthenticatedGuard;
