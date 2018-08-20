import { connect } from 'react-redux';
import List from '../components/List';

const mapStateToProps = state => {
  return { users: Object.keys(state.users).map(uid => ({ uid, ...state.users[uid] })) };
};

export default connect(mapStateToProps)(List);
