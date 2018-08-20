export const getReady = (currentUser, userList) => {
  return {
    type: 'GET_READY',
    currentUser,
    userList
  };
};

export const updateCurrentUser = currentUser => {
  return {
    type: 'UPDATE_CURRENT_USER',
    currentUser,
  };
};
