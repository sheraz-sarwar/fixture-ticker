import { connect } from 'react-redux';
import Table from './Table';
import data from './data';
import gameweeks from './gameweeks';

const mapStateToProps = state => ({
  range: state.range,
  sort: state.sort,
  data,
  gameweeks,
});

const mapDispatchToProps = dispatch => ({
  onCheckoutClick: () => {
    console.log('test');
  }
});

const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table);

export default TableContainer;
