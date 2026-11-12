import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Wrench, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();

  const [mode, setMode]       = useState('login');
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [form, setForm]       = useState({ name: '', email: '', password: '', phone: '' });

  // After login, go back to where the user was trying to go (ProtectedRoute sets this)
  const from = location.state?.from?.pathname || (mode === 'login' ? '/customer-dashboard' : '/customer-dashboard');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic client-side validation
    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }
    if (mode === 'register' && !form.name.trim()) {
      setError('Full name is required.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res  = await fetch(`/api/v1/auth/${mode}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...form, role: 'customer' }),
      });
      const data = await res.json();

      if (!data.status) throw new Error(data.message || 'Authentication failed');

      login(data.token, data.user);
      toast.success(mode === 'login' ? 'Welcome back!' : 'Account created successfully!');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(m => (m === 'login' ? 'register' : 'login'));
    setError('');
    setForm({ name: '', email: '', password: '', phone: '' });
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="bg-sky-500 text-white p-2 rounded-lg group-hover:bg-sky-600 transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">RepairHub</span>
          </Link>
        </div>

        <form
          onSubmit={submit}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-sm space-y-5"
        >
          <div>
            <p className="text-sky-600 font-semibold text-sm">Customer portal</p>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {mode === 'login'
                ? 'Sign in to manage your repair bookings.'
                : 'Join RepairHub and book your first repair today.'}
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <p className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm">
              {error}
            </p>
          )}

          {/* Name field (register only) */}
          {mode === 'register' && (
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPw ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 pr-10 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Phone (register only) */}
          {mode === 'register' && (
            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Phone <span className="text-slate-400">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold py-3 transition-colors"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>

          {/* Mode toggle */}
          <button
            type="button"
            onClick={toggleMode}
            className="w-full text-sky-700 dark:text-sky-400 text-sm hover:underline"
          >
            {mode === 'login'
              ? "New customer? Create an account"
              : "Already have an account? Sign in"}
          </button>

          {/* Technician link */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Are you a technician?{' '}
            <Link to="/technician-register" className="text-sky-600 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Auth;
