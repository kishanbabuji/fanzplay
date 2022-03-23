  import { createContext } from 'react';
  
  const userInfoContext = createContext({
    loggedIn: false,
    uid: "",
    isAdmin: false
  })
  export default userInfoContext