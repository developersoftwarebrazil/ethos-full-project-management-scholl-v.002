"use client";
import { useState } from "react";
import { createGrade } from "@/lib/api/grades";

export default function GradeForm() {
  const [formData, setFormData] = useState({
    level: 0,
    name: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGrade(formData);
    alert("Série criada com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="number"
        name="level"
        placeholder="Nível (ex: 1)"
        value={formData.level}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      <input
        type="text"
        name="name"
        placeholder="Nome (ex: 1º Semestre)"
        value={formData.name}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      <textarea
        name="description"
        placeholder="Descrição"
        value={formData.description}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
        Salvar
      </button>
    </form>
  );
}
