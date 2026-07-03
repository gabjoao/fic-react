import { BiBook, BiFolder } from "react-icons/bi";
import { PiUserCircleDuotone } from "react-icons/pi";

export default function SideBar() {
  return (
    <aside className="bg-slate-900 text-slate-50 h-screen w-82 p-5">
      <h1 className="font-bold text-3xl text-center">FIC</h1>

      <nav className="flex flex-col gap-5 mt-9">
        <div className="flex flex-row items-center gap-3 cursor-pointer">
          <PiUserCircleDuotone size={28} />
          <p className="text-lg font-medium hover:underline transition hover:font-bold">
            Usuários
          </p>
        </div>

        <div className="flex flex-row items-center gap-3 cursor-pointer">
          <BiBook size={28} />
          <p className="text-lg font-medium hover:underline transition hover:font-bold">
            Cursos
          </p>
        </div>

        <div className="flex flex-row items-center gap-3 cursor-pointer">
          <BiFolder size={28} />
          <p className="text-lg font-medium hover:underline transition hover:font-bold">
            Categoria
          </p>
        </div>
      </nav>
    </aside>
  );
}
