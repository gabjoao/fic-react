import { useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

type Users = {
  id: number;
  nome: string;
  email: string;
  tipoAcesso: string;
  criadoEm: string;
  atualizadoEm: string;
};

export default function UserPage() {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipoAcesso, setTipoAcesso] = useState("");
  const [btnLabel, setBtnLabel] = useState("Adicionar");

  function handleClick(item) {
    setId(item.id);
    setNome(item.nome);
    setEmail(item.email);
    setTipoAcesso(item.tipoAcesso);
  }

  function limpaCampos() {
    setId("");
    setNome("");
    setEmail("");
    setTipoAcesso("");
    setBtnLabel("Adicionar");
  }

  // function handleButton(id, payload) {
  //   if (id) updateUsers(id, payload);
  //   createUsers(id, payload);
  // }

  async function updateUsers(id, novosDados) {
    try {
      const response = await fetch(`http://localhost:3000/usuario/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novosDados),
      });
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }

      alert("Usuario alterado com sucesso.");
      await getUsuarios();
      limpaCampos();
    } catch (e) {
      console.error("Ocorreu um erro inesperado", e);
      alert("Ocorreu um erro inesperado");
    }
  }

  async function createUsers(dados) {
    try {
      const response = await fetch(`http://localhost:3000/usuario/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          adminid: "3",
        },
        body: JSON.stringify(dados),
      });
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }

      alert("Usuario criado com sucesso.");
      await getUsuarios();
      limpaCampos();
    } catch (e) {
      console.error("Ocorreu um erro inesperado", e);
      alert("Ocorreu um erro inesperado");
    }
  }

  async function deleteUser(id) {
    try {
      const response = await fetch(`http://localhost:3000/usuario/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }

      alert("Usuario excluído com sucesso.");
      await getUsuarios();
      limpaCampos();
    } catch (e) {
      console.error("Ocorreu um erro inesperado", e);
      alert("Ocorreu um erro inesperado");
    }
  }

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

        <div className="flex flex-row p6 gap-3 py-4">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="rounded-lg border border-slate-300 px-4 py-2"
            placeholder="Nome"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-slate-300 px-4 py-2"
            placeholder="E-mail"
          />
          <input
            type="text"
            value={tipoAcesso}
            onChange={(e) => setTipoAcesso(e.target.value)}
            className="rounded-lg border border-slate-300 px-4 py-2"
            placeholder="Tipo Acesso"
          />
          <button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              id
                ? updateUsers(id, { nome, email, tipoAcesso })
                : createUsers({ nome, email, tipoAcesso });
            }}
            className="border-b-cyan-500 bg-slate-800 rounded-md text-slate-50 p-2 hover:bg-slate-600 hover:shadow-2xl cursor-pointer transition self-end"
          >
            {btnLabel}
          </button>
          <button
            onClick={limpaCampos}
            className="border-b-cyan-500 bg-slate-800 rounded-md text-slate-50 p-2 hover:bg-slate-600 hover:shadow-2xl cursor-pointer transition self-end"
          >
            Limpar
          </button>
        </div>
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
          {users.map((u) => {
            const dataCriacao = new Date(u.criadoEm);
            const dataAtualizacao = new Date(u.atualizadoEm);

            return (
              <tr
                className="cursor-pointer hover:bg-slate-100"
                key={u.id}
                onClick={() => {
                  handleClick(u);
                  setBtnLabel("Editar");
                }}
              >
                <td className="p-3">{u.nome}</td>
                <td className="p-3">{u.email}</td>

                <td className="p-3">
                  {new Intl.DateTimeFormat("pt-BR").format(dataCriacao)}
                </td>

                <td className="p-3">
                  {new Intl.DateTimeFormat("pt-BR").format(dataAtualizacao)}
                </td>

                <td className="p-3">{u.tipoAcesso}</td>
                <td className="p-3 flex flex-row gap-4 cursor-pointer">
                  <BiPencil size={18} color="blue" />
                  <BiTrash
                    onClick={() => deleteUser(u.id)}
                    color="red"
                    size={18}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
