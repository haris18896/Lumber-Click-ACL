import React, {createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [role, setRole] = useState(null);
  const fetchUserRoleAPI = async () => {
    const userRole = 'supplier'; // Replace with actual fetching logic
    setRole(userRole);
  };

  useEffect(() => {
    fetchUserRoleAPI().then(() => {});
  }, []);

  return <AuthContext.Provider value={{role}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
