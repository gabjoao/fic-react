import { useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

type Users = {
  id: number;
  nome: string;
  email: string;
  tipoAcesso: string;
  createdAt: string;
  updatedAt: string;
};

export default function UserPage() {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);

  async function getUsuarios() {
    try {
      const response = await fetch(`http://localhost:3000/usuario/`);
      const json = await response.json();
      console.log("JSON: ", json);
      setUsers(json);
    } catch (e) {
      console.error("Ocorreu um erro", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUsuarios();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="text-xl font-bold text-slate-900">Carregando...</h1>
      </div>
    );
  }

  return (
    <main className="flex flex-col px-14 py-7 w-screen">
      <div className="flex flex-col my-12">
        <h2 className="text-slate-900 text-2xl font-bold">Usuário</h2>
        <p className="text-slate-900 text-md">Gerencie os usuários aqui</p>
        <button className="self-end bg-slate-900 rounded-md text-slate-50 p-2 cursor-pointer hover:bg-slate-700 hover:scale-110 hover:shadow-2xl transition">
          + Novo usuário
        </button>
      </div>

      <table className="w-full border-collapse text-left text-sm text-slate-900">
        <thead className="bg-slate-100 text-slate-900 border-b border-slate-200">
          <tr>
            <th className="p-3 font-bold">Nome</th>
            <th className="p-3 font-bold">Email</th>
            <th className="p-3 font-bold">Data de cadastro</th>
            <th className="p-3 font-bold">Data de atualização</th>
            <th className="p-3 font-bold">Tipo acesso</th>
            <th className="p-3 font-bold">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-3">{u.nome}</td>
              <td className="p-3">{u.email}</td>
              {/*TODO: FORMATAÇÃO DA DATA */}
              <td className="p-3">{u.createdAt}</td>
              <td className="p-3">{u.updatedAt}</td>
              <td className="p-3">{u.tipoAcesso}</td>
              <td className="p-3 flex flex-row gap-4 cursor-pointer">
                <BiPencil size={18} color="blue" />
                <BiTrash color="red" size={18} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
