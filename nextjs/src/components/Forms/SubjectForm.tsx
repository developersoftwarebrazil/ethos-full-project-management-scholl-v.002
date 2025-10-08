"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createSubjectWorkflow,
  updateSubjectWorkflow,
} from "@/lib/api/workflows/subject";
import { Subject } from "@/lib/types/subject";
import InputField from "../Inputs/InputField";
import TeacherMultiSelect from "../Lists/TeacherMultiSelect";

let API_URL = process.env.NEXT_PUBLIC_API_URL;

// Se estiver rodando no browser, usamos localhost
if (typeof window !== "undefined") {
  API_URL = "http://localhost:8000";
}

// Se estiver no server (SSR ou API routes), usamos o nome do container
export { API_URL };

type Option = { id: number; name: string };

const fetchTeachers = async (): Promise<Option[]> => {
  try {
    const res = await fetch(
      `${API_URL}/api/teachers/?role=teacher&page_size=100`
    );
    if (!res.ok) throw new Error("Erro ao buscar professores");

    const data = await res.json();

    return data.results.map((t: any) => ({
      id: t.id,
      name: `${t.user.first_name} ${t.user.last_name}`,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

type SubjectFormProps = {
  type: "create" | "update";
  data?: Subject;
  onSuccess?: () => void;
};

export default function SubjectForm({
  type,
  data,
  onSuccess,
}: SubjectFormProps) {
  const router = useRouter();

  // Estados do formulário
  const [name, setName] = useState(data?.name || "");
  const [description, setDescription] = useState(data?.description || "");
  const [teacherIds, setTeacherIds] = useState<number[]>([]);
  const [teachers, setTeachers] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  // Carregar professores da API
  useEffect(() => {
    async function loadTeachers() {
      const allTeachers = await fetchTeachers();
      setTeachers(allTeachers);

      // Se estiver editando, preenche os professores selecionados
      if (data?.teachers) {
        setTeacherIds(
          data.teachers.map((t: any) => (typeof t === "number" ? t : t.id))
        );
      }
    }
    loadTeachers();
  }, [data]);

  // Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { name, description, teachers_ids: teacherIds };
      if (type === "create") {
        await createSubjectWorkflow(payload);
        console.log("Criou", payload);
        console.log("Payload enviado:", JSON.stringify(payload, null, 2));
      } else if (type === "update" && data) {
        await updateSubjectWorkflow(data.id, payload);
        console.log("Atualizou", payload);
      }

      onSuccess?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar disciplina.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-4 bg-white rounded-lg shadow"
    >
      {/* Nome da disciplina */}
      <InputField
        label="Nome da Disciplina"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Descrição */}
      <InputField
        label="Descrição"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Seleção de professores */}
      <TeacherMultiSelect
        options={teachers}
        values={teacherIds}
        onChange={setTeacherIds}
      />

      {/* Botão de envio */}
      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 disabled:opacity-50"
      >
        {loading ? "Salvando..." : type === "create" ? "Criar" : "Atualizar"}
      </button>
    </form>
  );
}
