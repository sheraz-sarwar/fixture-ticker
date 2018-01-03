import { connect } from 'react-redux';
import Settings from './Settings';
import { setRange, setSort } from './actions';

const mapStateToProps = state => ({
  range: state.range,
  sort: state.sort,
});

const mapDispatchToProps = dispatch => ({
  setRange: (range) => {
    dispatch(setRange(range));
  },
  setSort: (value) => {
    dispatch(setSort(value));
  },
});

const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default SettingsContainer;
