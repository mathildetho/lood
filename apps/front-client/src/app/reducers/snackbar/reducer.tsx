const initialState = {
  UID: 0,
  stack: {},
};

const add = (
  state = initialState,
  action: {
    icon: string;
    message: { message: string };
    action: string;
    time: number;
    timer: NodeJS.Timeout;
  }
) => {
  const newSnackbar = {
    key: state.UID,
    icon: action.icon,
    message: action.message,
    action: action.action,
    time: action.time,
    timeLeft: action.time,
    timer: action.timer,
  };

  const newUID = state.UID + 1;

  return {
    ...state,
    UID: newUID,
    stack: { ...state.stack, [state.UID]: newSnackbar },
  };
};

const remove = (state = initialState, action: { key: string | number }) => {
  const snackbar = state.stack[action.key];

  if (!snackbar) {
    return state;
  }

  const newPile = { ...state.stack };

  clearTimeout(snackbar.timer);

  delete newPile[action.key];

  return { ...state, stack: newPile };
};

const stopTimer = (state = initialState, action: { key: string | number }) => {
  const snackbar = state.stack[action.key];

  if (!snackbar) {
    return state;
  }

  const newSnackbar = { ...snackbar, time: undefined, timer: undefined };

  clearTimeout(snackbar.timer);

  return { ...state, stack: { ...state.stack, [action.key]: newSnackbar } };
};

const createReducer = (
  initialState: { UID: number; stack: Record<string, unknown> },
  handlers: any
) => {
  return function reducer(
    state = initialState,
    action: { type: string | number }
  ) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export default createReducer(initialState, {
  ADD_SNACKBAR: add,
  REMOVE_SNACKBAR: remove,
  STOP_TIMER_SNACKBAR: stopTimer,
});
