import { Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { Welcome } from "./pages/Welcome/Welcome";
import { Classes } from "./pages/Classes/Classes";
import { ClassDetail } from "./pages/ClassDetail/ClassDetail";
import { Search } from "./pages/Search/Search";
import { Calendar } from "./pages/Calendar/Calendar";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Classes />} />
        <Route path="/classes/:id" element={<ClassDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Layout>
  );
}

export default App;
