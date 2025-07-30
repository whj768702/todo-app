import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setToken } from "./api";
import Login from "./pages/Login";
import Todos from "./pages/Todos";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
          <Route
            path="*"
            element={<Login onLogin={() => setLoggedIn(true)} />}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
