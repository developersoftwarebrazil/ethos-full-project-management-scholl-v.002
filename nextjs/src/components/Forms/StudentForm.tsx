// src/components/Forms/StudentForm.tsx
"use client";

import { useState, useEffect } from "react";
import { createUserAndStudent, updateUserAndStudent } from "@/lib/api/workflows/student";
import { Student } from "@/lib/types/student";

interface StudentFormProps {
  student?: Student;
  onSuccess?: (student: Student) => void;
}

export default function StudentForm({ student, onSuccess }: StudentFormProps) {
  const [formData, setFormData] = useState({
    username: student?.user.username || "",
    email: student?.user.email || "",
    first_name: student?.user.first_name || "",
    last_name: student?.user.last_name || "",
    phone: student?.user.phone || "",
    address: student?.user.address || "",
    img: null as File | null,
    sex: student?.sex || "MALE",
    bloodType: student?.bloodType || "A+",
    birthday: student?.birthday || "",
    classroom: student?.classroom || "",
    grade: student?.grade || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let result;
      if (student) {
        result = await updateUserAndStudent(formData, student.user.id, student.id);
      } else {
        result = await createUserAndStudent(formData);
      }
      onSuccess?.(result.student);
      alert("Aluno salvo com sucesso!");
    } catch (err: any) {
      alert("Erro: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-md shadow-md">
      <div>
        <label>Nome</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Sobrenome</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Telefone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div>
        <label>Endereço</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div>
        <label>Foto</label>
        <input type="file" name="img" onChange={handleChange} />
      </div>
      <div>
        <label>Sexo</label>
        <select name="sex" value={formData.sex} onChange={handleChange}>
          <option value="MALE">Masculino</option>
          <option value="FEMALE">Feminino</option>
        </select>
      </div>
      <div>
        <label>Tipo Sanguíneo</label>
        <select name="bloodType" value={formData.bloodType} onChange={handleChange}>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bt => (
            <option key={bt} value={bt}>{bt}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Data de Nascimento</label>
        <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
      </div>
      <div>
        <label>Turma</label>
        <input type="number" name="classroom" value={formData.classroom} onChange={handleChange} />
      </div>
      <div>
        <label>Série</label>
        <input type="number" name="grade" value={formData.grade} onChange={handleChange} />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        {student ? "Atualizar" : "Criar"} Aluno
      </button>
    </form>
  );
}
