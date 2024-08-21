import React, { createContext, useContext, useState } from 'react';

type LoginContextType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const state = useState<boolean>(false); // Initial value is `false`

  return (
    <LoginContext.Provider value={state}>{children}</LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextType => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }

  return context;
};
