import { BiBook, BiFolder } from "react-icons/bi";
import { PiUserCircleDuotone } from "react-icons/pi";
import { NavLink } from "react-router";

export default function SideBar() {
  return (
    <aside className="bg-slate-900 text-slate-50 h-screen w-82 p-5">
      <h1 className="font-bold text-3xl text-center">FIC</h1>

      <nav className="flex flex-col gap-5 mt-9">
        <NavLink
          to={"/"}
          className="flex flex-row items-center gap-3 cursor-pointer"
        >
          <PiUserCircleDuotone size={28} />
          <p className="text-lg font-medium hover:underline transition hover:font-bold">
            Usuários
          </p>
        </NavLink>

        <NavLink
          to={"/categorias"}
          className="flex flex-row items-center gap-3 cursor-pointer"
        >
          <BiFolder size={28} />
          <p className="text-lg font-medium hover:underline transition hover:font-bold">
            Categorias
          </p>
        </NavLink>

        <NavLink
          to={"/cursos"}
          className="flex flex-row items-center gap-3 cursor-pointer"
        >
          <BiBook size={28} />
          <p className="text-lg font-medium hover:underline transition hover:font-bold">
            Cursos
          </p>
        </NavLink>
      </nav>
    </aside>
  );
}
