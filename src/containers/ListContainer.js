import { connect } from 'react-redux';
import { updateFilters } from '../actions';
import List from '../components/List';

const canDonate = {
  'A+': ['A+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'O-': ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  'AB+': ['AB+'],
  'AB-': ['AB-', 'AB+']
};

const mapStateToProps = state => {
  let { available, group, keyword } = state.filters;

  keyword = keyword.toLowerCase();

  let d = new Date();
  d.setMonth(d.getMonth() - 3);
  d = d.getTime();

  const users = Object.keys(state.users)
    .filter(uid => {
      const user = state.users[uid];
      const address = user.address || '';
      return (
        user.group &&
        (available === 'ALL' || user.lastDonation < d) &&
        (keyword === '' ||
          (address.toLowerCase().includes(keyword) ||
            user.name.toLowerCase().includes(keyword))) &&
        (group === 'ALL' || canDonate[user.group].includes(group))
      );
    })
    .map(uid => ({ uid, ...state.users[uid] }));

  return {
    users,
    filters: state.filters,
    actionButton: state.currentUser.admin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateKeyword: keyword => dispatch(updateFilters('keyword', keyword)),
    updateGroup: group => dispatch(updateFilters('group', group)),
    updateAvailable: available =>
      dispatch(updateFilters('available', available))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
