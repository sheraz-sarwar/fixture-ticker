const defaultState = {
  range: 3,
  sort: 'overall'
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_RANGE':
      return Object.assign({}, state, {
        range: action.range
      });
    case 'SET_SORT':
      return Object.assign({}, state, {
        sort: action.sort
      });
    default:
      return state
  }
};

export default reducer
