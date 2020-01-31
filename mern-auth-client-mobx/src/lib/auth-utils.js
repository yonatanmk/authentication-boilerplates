// import cookie from 'js-cookie';

// set in cookie
// export const setCookie = (key, value) => {
//   if (window !== 'undefined') {
//     cookie.set(key, value, {
//       expires: 1 // 1 day
//     });
//   }
// };

// // remove from cookie
// export const removeCookie = key => {
//   if (window !== 'undefined') {
//     cookie.remove(key, {
//       expires: 1 // 1 day, is this needed???
//     });
//   }
// };

// // get from cookie such as stored token
// // will be useful when we need to make request to server with token
// export const getCookie = key => {
//   if (window !== 'undefined') {
//     return cookie.get(key);
//   }
// };

// set in localstorage
export const setLocalStorage = (key, value) => {
  const isObject = typeof value === 'object' && value !== null
  if (window !== 'undefined') {
    return localStorage.setItem(key, isObject ? JSON.stringify(value) : value);
  }
};

export const getLocalStorage = (key) => {
  if (window !== 'undefined') {
    return localStorage.getItem(key)
  } else {
    return null
  }
};

// remove from localstorage
export const removeLocalStorage = key => {
  if (window !== 'undefined') {
    return localStorage.removeItem(key);
  }
};

// access jwt from localstorage
export const isAuth = () => {
  if (window !== 'undefined') {
    const token = localStorage.getItem('token');
    return !!token
  } else {
    return false;
  }
};

export const signout = next => {
  removeLocalStorage('token');
  if (next) next();
};