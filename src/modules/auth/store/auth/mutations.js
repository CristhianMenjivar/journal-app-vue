// export const myMutation = (state) => {
// };

export const loginUser = (
  state,
  { user, idToken, refreshToken, expiresIn }
) => {
  if (idToken) {
    localStorage.setItem("idToken", idToken);
    state.idToken = idToken;
  }

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
    state.refreshToken = refreshToken;
  }

  if (refreshToken) {
    localStorage.setItem("expiresIn", parseInt(expiresIn));
    state.expiresIn = parseInt(expiresIn);
  }

  state.status = "authenticated";
  state.user = user;
};

export const logout = (state) => {
  state.user = null;
  state.idToken = null;
  state.refreshToken = null;
  state.status = "not-authenticated";

  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expiresIn");
};
