import { Route, Routes } from "react-router";
import "./App.css";
import SideBar from "./components/SideBar";
import UserPage from "./pages/UserPage";
import CursoPage from "./pages/CursoPage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <div className="flex flex-row">
      <SideBar />
      <Routes>
        <Route>
          <Route index element={<UserPage />} />
          <Route path="cursos" element={<CursoPage />} />
          <Route path="categorias" element={<CategoryPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
