export const setLocalStorage = (key: string, value: string) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // catch possible errors:
    }
  }

  export const getLocalStorage = (key: string) => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : "";
    } catch (e) {
      // if error, return initial value
      return "";
    }
  }