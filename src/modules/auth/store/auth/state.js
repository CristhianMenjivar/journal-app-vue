// status: 'authenticating, not-authenticated, authenticated
export default () => ({
  status: "authenticating",
  user: null,
  idToken: null,
  refreshToken: null,
  expiresIn: 0,
});
