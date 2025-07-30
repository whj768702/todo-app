import "./App.css";
import {
  BrowserRouter,
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

  const token = localStorage.getItem("token");
  if (token) {
    setToken(token);
    navigate("/todos");
  } else {
    navigate("/login");
  }

  return (
    <>
      <Routes>
        <Route path="/todos" element={<Todos />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
