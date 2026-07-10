import { useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

type Category = {
  id: number;
  nome: string;
  descricao: string;
};

export default function CategoryPage() {
  const [users, setUsers] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [btnLabel, setBtnLabel] = useState("Adicionar");

  function handleClick(item) {
    setId(item.id);
    setNome(item.nome);
    setDescricao(item.descricao);
  }

  function limpaCampos() {
    setId("");
    setNome("");
    setDescricao("");
    setBtnLabel("Adicionar");
  }

  // function handleButton(id, payload) {
  //   if (id) updateUsers(id, payload);
  //   createUsers(id, payload);
  // }

  async function updateCategorias(id, novosDados) {
    try {
      const response = await fetch(`http://localhost:3000/categoria/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          adminid: "1",
        },
        body: JSON.stringify(novosDados),
      });
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }

      alert("Categoria alterada com sucesso.");
      await getCategorias();
      limpaCampos();
    } catch (e) {
      console.error("Ocorreu um erro inesperado", e);
      alert("Ocorreu um erro inesperado");
    }
  }

  async function createCategorias(dados) {
    try {
      const response = await fetch(`http://localhost:3000/categoria/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          adminid: "1",
        },
        body: JSON.stringify(dados),
      });
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }

      alert("Categoria criada com sucesso.");
      await getCategorias();
      limpaCampos();
    } catch (e) {
      console.error("Ocorreu um erro inesperado", e);
      alert("Ocorreu um erro inesperado");
    }
  }

  async function deleteCategoria(id) {
    try {
      const response = await fetch(`http://localhost:3000/categoria/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          adminid: "1",
        },
      });
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }

      alert("Categoria excluída com sucesso.");
      await getCategorias();
      limpaCampos();
    } catch (e) {
      console.error("Ocorreu um erro inesperado", e);
      alert("Ocorreu um erro inesperado");
    }
  }

  async function getCategorias() {
    try {
      const response = await fetch(`http://localhost:3000/categoria/`);
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
    getCategorias();
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
        <h2 className="text-slate-900 text-2xl font-bold">Categoria</h2>
        <p className="text-slate-900 text-md">Gerencie as categorias aqui</p>

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
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="rounded-lg border border-slate-300 px-4 py-2"
            placeholder="Descricao"
          />
          <button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              id
                ? updateCategorias(id, { nome, descricao })
                : createCategorias({ nome, descricao });
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
            <th className="p-3 font-bold">Descricao</th>
            <th className="p-3 font-bold">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {users.map((u) => {
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
                <td className="p-3">{u.descricao}</td>

                <td className="p-3 flex flex-row gap-4 cursor-pointer">
                  <BiPencil size={18} color="blue" />
                  <BiTrash
                    onClick={() => deleteCategoria(u.id)}
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
