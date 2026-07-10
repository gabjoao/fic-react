import { useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  cargaHoraria: number;
  categoriaId: number;
  criadoEm: string;
  atualizadoEm: string;
};

type CursoPayload = {
  titulo: string;
  descricao: string;
  cargaHoraria: number;
  categoria: {
    id: number;
  };
};

type CursoFormData = {
  titulo: string;
  descricao: string;
  cargaHoraria: string;
  categoriaId: string;
};

function mapCursoParaPayload(dados: CursoFormData): CursoPayload {
  return {
    titulo: dados.titulo,
    descricao: dados.descricao,
    cargaHoraria: Number(dados.cargaHoraria),
    categoria: {
      id: Number(dados.categoriaId),
    },
  };
}

export default function CursoPage() {
  const [users, setUsers] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [btnLabel, setBtnLabel] = useState("Adicionar");

  function handleClick(item: Curso) {
    setId(String(item.id));
    setTitulo(item.titulo);
    setDescricao(item.descricao);
    setCargaHoraria(String(item.cargaHoraria));
    setCategoriaId(String(item.categoriaId));
  }

  function limpaCampos() {
    setId("");
    setTitulo("");
    setDescricao("");
    setCargaHoraria("");
    setCategoriaId("");
    setBtnLabel("Adicionar");
  }

  async function updateCursos(id: string, dados: CursoFormData) {
    try {
      const payload = mapCursoParaPayload(dados);

      const response = await fetch(`http://localhost:3000/curso/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          adminid: "1",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }

      alert("Curso alterado com sucesso.");
      await getCursos();
      limpaCampos();
    } catch (e) {
      console.error("Ocorreu um erro inesperado", e);
      alert("Ocorreu um erro inesperado");
    }
  }

  async function createCursos(dados: CursoFormData) {
    try {
      const payload = mapCursoParaPayload(dados);

      const response = await fetch(`http://localhost:3000/curso/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          adminid: "1",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }

      alert("Curso criado com sucesso.");
      await getCursos();
      limpaCampos();
    } catch (e) {
      console.error("Ocorreu um erro inesperado", e);
      alert("Ocorreu um erro inesperado");
    }
  }

  async function deleteCursos(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/curso/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          adminid: "1",
        },
      });
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }

      alert("Curso excluído com sucesso.");
      await getCursos();
      limpaCampos();
    } catch (e) {
      console.error("Ocorreu um erro inesperado", e);
      alert("Ocorreu um erro inesperado");
    }
  }

  async function getCursos() {
    try {
      const response = await fetch(`http://localhost:3000/curso/`);
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
    getCursos();
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
        <h2 className="text-slate-900 text-2xl font-bold">Curso</h2>
        <p className="text-slate-900 text-md">Gerencie os cursos aqui</p>

        <div className="flex flex-row p6 gap-3 py-4">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="rounded-lg border border-slate-300 px-4 py-2"
            placeholder="Titulo"
          />
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="rounded-lg border border-slate-300 px-4 py-2"
            placeholder="Descricao"
          />

          <input
            type="text"
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(e.target.value)}
            className="rounded-lg border border-slate-300 px-4 py-2"
            placeholder="Carga Horária"
          />

          <input
            type="text"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="rounded-lg border border-slate-300 px-4 py-2"
            placeholder="ID da categoria"
          />

          <button
            onClick={() => {
              const dados: CursoFormData = {
                titulo,
                descricao,
                cargaHoraria,
                categoriaId,
              };

              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              id ? updateCursos(id, dados) : createCursos(dados);
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
            <th className="p-3 font-bold">Titulo</th>
            <th className="p-3 font-bold">Descricao</th>
            <th className="p-3 font-bold">Carga Horária</th>
            <th className="p-3 font-bold">Data de cadastro</th>
            <th className="p-3 font-bold">Data de atualização</th>
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
                <td className="p-3">{u.titulo}</td>
                <td className="p-3">{u.descricao}</td>
                <td className="p-3">{u.cargaHoraria}</td>

                <td className="p-3">
                  {new Intl.DateTimeFormat("pt-BR").format(dataCriacao)}
                </td>

                <td className="p-3">
                  {new Intl.DateTimeFormat("pt-BR").format(dataAtualizacao)}
                </td>

                <td className="p-3 flex flex-row gap-4 cursor-pointer">
                  <BiPencil size={18} color="blue" />
                  <BiTrash
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCursos(u.id);
                    }}
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
