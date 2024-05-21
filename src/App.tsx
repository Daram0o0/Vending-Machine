import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import DrinkMachine from './components/DrinkMachine';
import LoginContext from './context/LoginContext';
function App() {
  const [userName, setUserName] = useState<string | null>(null);
  return (
    <LoginContext.Provider value={{ userName, setUserName }}>
      <DrinkMachine />
    </LoginContext.Provider>
  )
}
export default App;
