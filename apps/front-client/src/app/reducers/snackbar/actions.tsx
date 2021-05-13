export const add = (icon: string, message: string, time: number) => (
  dispatch: (arg0: {
    type: string;
    key?: string;
    icon?: string;
    message?: string;
    time?: number;
    timer?: NodeJS.Timeout;
  }) => void,
  getState: () => { snackbars: { UID: string } }
) => {
  const { UID } = getState().snackbars;

  const timer = setTimeout(() => {
    dispatch(remove(UID));
  }, time);

  dispatch({ type: 'ADD_SNACKBAR', icon, message, time, timer });
};

export const remove = (key: string) => {
  return { type: 'REMOVE_SNACKBAR', key };
};

export const stopTimer = (key: string) => {
  return { type: 'STOP_TIMER_SNACKBAR', key };
};
