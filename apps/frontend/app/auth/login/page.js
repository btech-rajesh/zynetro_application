'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginUser } from '../../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('loading');

    try {
      const result = await loginUser(form.email, form.password);
      // Store token in localStorage
      localStorage.setItem('authToken', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      
      // Redirect to home or dashboard
      router.push('/');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  };

  const inputClass =
    'w-full px-4 py-3 text-sm bg-white/[0.06] border border-white/[0.12] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white/[0.09] transition-colors';

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4 pt-16">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-600/8 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-600 text-white font-extrabold text-xl">Z</span>
            <span className="text-white font-bold text-xl">Zynetra</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-6 mb-1">Welcome back</h1>
          <p className="text-gray-400 text-sm">Sign in to your Zynetra account</p>
        </div>

        {/* Card */}
        <form
          onSubmit={onSubmit}
          className="bg-gray-900 border border-white/[0.08] rounded-3xl p-8 shadow-2xl space-y-5"
        >
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              placeholder="you@company.com"
              className={inputClass}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
            </div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              required
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-500 disabled:opacity-60 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-900/30"
          >
            {status === 'loading' ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-orange-500 hover:text-orange-400 font-medium">
              Create account
            </Link>
          </p>
        </form>

        <p className="text-center text-xs text-gray-600 mt-6">
          <Link href="/" className="hover:text-gray-400 transition-colors">← Back to Zynetra</Link>
        </p>
      </div>
    </main>
  );
}
