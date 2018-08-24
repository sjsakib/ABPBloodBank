import { connect } from 'react-redux';
import { updateFilters } from '../actions';
import List from '../components/List';

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
        (available === 'ALL' || user.lastDonation < d) &&
        (keyword === '' ||
          (address.toLowerCase().includes(keyword) ||
            user.name.toLowerCase().includes(keyword))) &&
        (group === 'ALL' || user.group === group)
      );
    })
    .map(uid => ({ uid, ...state.users[uid] }));

  return {
    users,
    filters: state.filters
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
