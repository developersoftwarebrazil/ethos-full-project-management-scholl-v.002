'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) alert('Usuário criado com sucesso!');
    else alert('Erro ao criar usuário');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-10 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        {['first_name', 'last_name', 'email', 'password'].map((field) => (
          <input
            key={field}
            type={field === 'password' ? 'password' : 'text'}
            placeholder={field.replace('_', ' ')}
            value={form[field as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="block w-full mb-4 p-3 border rounded"
          />
        ))}
        <button className="w-full bg-blue-800 text-white py-2 rounded">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
