export const getReady = (currentUser, userList) => {
  return {
    type: 'GET_READY',
    currentUser,
    userList
  };
};
