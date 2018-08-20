export const getReady = (currentUser, users) => {
  return {
    type: 'GET_READY',
    currentUser,
    users
  };
};

export const updateCurrentUser = currentUser => {
  return {
    type: 'UPDATE_CURRENT_USER',
    currentUser,
  };
};
