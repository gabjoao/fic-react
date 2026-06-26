import { PiUserCircleDuotone } from "react-icons/pi";
import "./App.css";
import { BiBook, BiFolder } from "react-icons/bi";

function App() {
  return (
    <div>
      <aside>
        <h1>FIC - Formação Inicial e Continuada</h1>

        <nav>
          <div className="flex flex-row align-center">
            <PiUserCircleDuotone /> <p>Usuários</p>
          </div>

          <div className="flex flex-row align-center">
            <BiBook />
            <p>Cursos</p>
          </div>

          <div className="flex flex-row align-center">
            <BiFolder />
            <p>Categoria</p>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default App;
