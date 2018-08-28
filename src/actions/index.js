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
    currentUser
  };
};

export const updateUserInfo = (key, userInfo) => {
  return {
    type: 'UPDATE_USER_INFO',
    key,
    userInfo
  };
};

export const updateFilters = (key, val) => {
  return {
    type: 'UPDATE_FILTERS',
    key,
    val
  };
};

export const savingUser = () => ({ type: 'SAVING_USER' });
