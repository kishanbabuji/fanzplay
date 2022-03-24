import { createContext } from 'react';


const userInfoContext = createContext({
  loggedIn: false,
  uid: "",
  isAdmin: false,
  user: {},
  setUser: {},
  setUid: {},
  setUserLoggedIn: {}



})
export default userInfoContext