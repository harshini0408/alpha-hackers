'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_AUTH_API || 'https://alpha-hackers-ikgr.onrender.com/api';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch {
      setError('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-soft-grey flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-deep-blue">
            Logistics<span className="text-cyan">Now</span>
          </Link>
          <p className="text-sm text-neutral-500 mt-2">Transporter Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 space-y-5">
          <h1 className="text-xl font-semibold text-deep-blue">Sign In</h1>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-lg">{error}</div>
          )}

          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full !py-2.5 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-neutral-500">
            {`Don't have an account? `}
            <Link href="/signup" className="text-cyan font-medium hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
