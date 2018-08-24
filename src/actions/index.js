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

export const updateUserInfo = (key, userInfo) => {
  return {
    type: 'UPDATE_USER_INFO',
    key,
    userInfo,
  };
};