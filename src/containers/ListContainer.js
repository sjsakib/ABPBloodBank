import { connect } from 'react-redux';
import List from '../components/List';

const mapStateToProps = state => {
  return { userList: state.userList };
};

export default connect(mapStateToProps)(List);
