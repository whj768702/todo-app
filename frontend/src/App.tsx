import "./App.css";
import { useEffect } from "react";
import {
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { setToken } from "./api";
import Login from "./pages/Login";
import Todos from "./pages/Todos";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      navigate("/todos");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
