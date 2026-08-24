import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.email || !form.password || (mode === 'register' && !form.name)) return setError('Please complete the required fields.');
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/auth/${mode}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, role: 'customer' }) });
      const data = await response.json();
      if (!data.status) throw new Error(data.message || 'Authentication failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/customer-dashboard');
    } catch (requestError) { setError(requestError.message); } finally { setLoading(false); }
  };

  return <main className="min-h-screen bg-slate-50 py-24 px-4"><form onSubmit={submit} className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-5">
    <div><p className="text-sky-600 font-semibold">Repairs marketplace</p><h1 className="text-3xl font-bold text-slate-900 mt-2">{mode === 'login' ? 'Welcome back' : 'Create your customer account'}</h1></div>
    {error && <p className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 text-sm">{error}</p>}
    {mode === 'register' && <input required placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-4 py-3" />}
    <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border rounded-lg px-4 py-3" />
    <input required minLength={6} type="password" placeholder="Password (6+ characters)" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full border rounded-lg px-4 py-3" />
    {mode === 'register' && <input placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border rounded-lg px-4 py-3" />}
    <button disabled={loading} className="w-full rounded-lg bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-semibold py-3">{loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
    <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="w-full text-sky-700 text-sm">{mode === 'login' ? 'New customer? Create an account' : 'Already registered? Sign in'}</button>
  </form></main>;
};

export default Auth;