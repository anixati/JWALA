import React from "react";
import { Loader } from "rsuite";
import { useAuthState, authContext } from "..";

export const AuthProvider = ({ children }) => {
  const state = useAuthState();
  if (state.loading) {
    return <div style={{ width: '100%', textAlign: 'center' }}><br /><br /><Loader content="Initilaising..." vertical /></div>
  }
  return <authContext.Provider value={state}>
    {children}
  </authContext.Provider>;
};
