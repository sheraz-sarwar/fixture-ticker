import { connect } from 'react-redux';
import Settings from './Settings';
import { setRange } from './actions';

const mapStateToProps = state => ({
  range: state.range,
  sort: state.sort,
});

const mapDispatchToProps = dispatch => ({
  decrement: (range) => {
    dispatch(setRange(Math.max(0, range - 1)));
  },
  increment: (range) => {
    dispatch(setRange(range + 1));
  },
  setSort: (value) => {
    console.log(value);
  },
});

const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default SettingsContainer;
