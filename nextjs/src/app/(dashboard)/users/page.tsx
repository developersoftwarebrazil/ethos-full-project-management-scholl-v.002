'use client';
import { useEffect, useState } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('access');
    fetch('http://localhost:8000/api/users/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        console.log("API retornou:", data);
        setUsers(data.results || []);
      })
      .catch(err => console.error("Erro ao buscar usuários:", err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Usuários</h1>
      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Nome</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.first_name} {u.last_name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.roles?.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
