import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "./components";
import { useAuthContext } from "./context/AuthContext";
import { Welcome } from "./pages/Welcome/Welcome";
import { Classes } from "./pages/Classes/Classes";
import { ClassDetail } from "./pages/ClassDetail/ClassDetail";
import { Search } from "./pages/Search/Search";
import { MySchedule } from "./pages/MySchedule/MySchedule";

function App() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      navigate("/my-schedule", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Classes />} />
        <Route path="/classes/:id" element={<ClassDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/my-schedule" element={<MySchedule />} />
      </Routes>
    </Layout>
  );
}

export default App;
