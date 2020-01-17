export const isAuthenticated = request => {
  if (!request.user) {
    throw Error("Log In First");
  }
  return;
};
