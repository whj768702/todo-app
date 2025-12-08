import "./App.css";
import { useEffect } from "react";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { setToken } from "./api";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Todos from "./pages/Todos";

function App() {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      // Only redirect to /todos when the user is at root or the login page
      // so manual navigation to other routes (like /dashboard) isn't overridden.
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/dashboard");
      }
    } else {
      // If not authenticated, ensure the user is sent to /login unless
      // they're already on the login page.
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [navigate, location.pathname]);

  return (
    <>
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
