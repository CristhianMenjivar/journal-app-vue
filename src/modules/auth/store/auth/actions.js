// export const myAction = async ({ commit }) => { }

import authApi from "@/api/authApi";

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;

  try {
    const { data } = await authApi.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken, expiresIn } = data;
    //   actualizar el perfil
    await authApi.post(":update", {
      displayName: name,
      idToken,
    });

    // quita el usuario del user
    delete user.password;

    // llamar mutaciones: loggingUser
    commit("loginUser", {
      user,
      idToken,
      refreshToken,
      expiresIn,
    });

    return {
      ok: true,
      message: "User created success",
    };
  } catch (error) {
    const { code, message } = error?.response?.data?.error || {
      code: 500,
      message: "Server Error",
    };
    return {
      ok: false,
      message: `${code}: ${message}`,
    };
  }
};

// logging
export const singInUser = async ({ commit }, user) => {
  const { email, password } = user;

  try {
    const { data } = await authApi.post(":signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken, displayName, expiresIn } = data;

    user.name = displayName;

    // llamar mutaciones: loggingUser
    commit("loginUser", {
      user,
      idToken,
      refreshToken,
      expiresIn,
    });

    return {
      ok: true,
      message: "Login success!",
    };
  } catch (error) {
    const { code, message } = error?.response?.data?.error || {
      code: 500,
      message: "Server Error",
    };
    return {
      ok: false,
      message: `${code}: ${message}`,
    };
  }
};

export const checkAuthentication = async ({ commit }) => {
  // get data localStorage
  const idToken = localStorage.getItem("idToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const expiresIn = localStorage.getItem("expiresIn");

  if (!idToken) {
    commit("logout");
    return {
      ok: false,
      message: "Id token empty",
    };
  }

  try {
    const { data } = await authApi.post(":lookup", {
      idToken,
    });

    const { displayName, email } = data.users[0];

    const user = {
      name: displayName,
      email: email,
    };

    // refresh user state
    commit("loginUser", {
      user,
      idToken,
      refreshToken,
      expiresIn,
    });

    return {
      ok: true,
      message: "Check login success!",
    };
  } catch (error) {
    commit("logout");

    const { code, message } = error?.response?.data?.error || {
      code: 500,
      message: "Server Error",
    };
    return {
      ok: false,
      message: `${code}: ${message}`,
    };
  }
};
