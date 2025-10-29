"use client";
import { useState, useEffect, useRef } from "react";
import { createGrade } from "@/lib/api/grades";
import { fetchSubjects } from "@/lib/api/subjects";
import { Subject } from "@/lib/types/subject";

interface GradeFormProps {
  type: "create" | "update";
  data?: any;
  onSuccess?: () => void;
  onClose?: () => void; // opcional
}

export default function GradeForm({ onClose, onSuccess }: GradeFormProps) {
  const [formData, setFormData] = useState({
    level: 0,
    name: "",
    description: "",
    subject_ids: [] as number[],
  });

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLFormElement>(null);

  // Buscar subjects ao montar o componente
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await fetchSubjects(1, 100);
        setSubjects(data.results);
      } catch (err) {
        console.error("Erro ao buscar subjects:", err);
      }
    };
    loadSubjects();
  }, []);

  // Fecha modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let value: string | number | number[] = e.target.value;

    if (e.target.type === "number") {
      value = Number(e.target.value);
    } else if (e.target instanceof HTMLSelectElement && e.target.multiple) {
      value = Array.from(e.target.selectedOptions, (option) => Number(option.value));
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createGrade(formData);
      alert("Série criada com sucesso!");
      onSuccess?.();
      onClose?.();
    } catch (err: any) {
      console.error("Erro ao criar grade:", err);
      alert("Erro ao criar grade: " + JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        ref={modalRef}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transform transition-transform scale-100 animate-scale-in"
      >
        <h2 className="text-xl font-bold mb-4">Criar Nova Série</h2>

        <input
          type="number"
          name="level"
          placeholder="Nível (ex: 1)"
          value={formData.level}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-3"
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Nome (ex: 1º Semestre)"
          value={formData.name}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-3"
          required
        />

        <textarea
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-3"
        />

        <select
          name="subject_ids"
          multiple
          value={formData.subject_ids.map(String)}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-4"
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onClose?.()}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>

      <style jsx>{`
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
        @keyframes scale-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
