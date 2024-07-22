export const tryAndCatch = (func: Function, errorMessage: string = "") => {
  try {
    return func();
  } catch (error) {
    onError(errorMessage, error);
  }
};

export const onError = (errorMessage: string = "", error?: any) => {
  console.error(`Error - ${errorMessage}`, error);
  clearLocalStore();
};

export const setItemInLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getItemFromLocalStorage = (key: string) =>
  localStorage.getItem(key);

export const clearLocalStore = () => localStorage.clear();
