import "./App.css";
import SideBar from "./components/SideBar";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <div className="flex flex-row">
      <SideBar />
      <UserPage />
    </div>
  );
}

export default App;
