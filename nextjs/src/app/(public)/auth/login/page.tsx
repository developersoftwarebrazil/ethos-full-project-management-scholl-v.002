'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      router.push('/profile');
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-blue-900 text-white flex flex-col justify-center p-10 rounded-r-3xl">
        <h1 className="text-4xl font-bold mb-8">Login<br/>ETHOS</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mb-4 p-3 rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mb-6 p-3 rounded"
          />
          <button type="submit" className="bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded">
            Entrar
          </button>
        </form>
        <p className="mt-6 text-sm">
          Ainda não possui uma conta?{' '}
          <a href="/auth/register" className="underline text-yellow-300">Cadastre-se</a>
        </p>
      </div>
      <div
        className="flex-1 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/bg-books.jpg)',
        }}
      ></div>
    </div>
  );
}
