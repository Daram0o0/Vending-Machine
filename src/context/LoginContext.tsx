import { createContext, useState } from 'react';

interface LoginContextValue {
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginContext = createContext<LoginContextValue>({ userName: null, setUserName: () => { } });

export default LoginContext;