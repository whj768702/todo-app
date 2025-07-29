import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Todos from './pages/Todos';
import { useEffect, useState } from 'react';
import { setToken } from './api';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ? (
          <Route path="*" element={<Todos />} />
        ) : (
          <Route path="*" element={<Login onLogin={() => setLoggedIn(true)} />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
