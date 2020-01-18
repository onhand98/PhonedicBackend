export const isAuthenticated = request => {
  if (!request.user) {
    return false;
  } else {
    return true;
  }
};

export const isUser = request => {
  if (request.user && request.user.permission === "USER") {
    return true;
  } else {
    return false;
  }
};

export const isAuthor = request => {
  if (request.user && request.user.permission === "AUTHOR") {
    return true;
  } else {
    return false;
  }
};
