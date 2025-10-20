import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import auth from our config

const AdminLogin = () => {
  const [email, setEmail] = useState(''); // Changed from username to email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error on new attempt
    try {
      // Use Firebase to sign in
      await signInWithEmailAndPassword(auth, email, password);
      // On success, Firebase automatically handles the session. We just navigate.
      navigate('/admin/dashboard');
    } catch (err) {
      // If Firebase returns an error, show it to the user
      setError('Invalid email or password. Please try again.');
      console.error("Firebase login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-bg">
      <div className="w-full max-w-md p-8 space-y-8 bg-secondary-bg rounded-lg shadow-lg border border-border-color">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-accent">Admin Panel Login</h1>
          <p className="mt-2 text-text-secondary">RRtechGeo CMS</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-bold text-text-secondary">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-text-primary bg-slate-100 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-text-secondary">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-text-primary bg-slate-100 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-accent rounded-md hover:bg-accent-dark focus:outline-none focus:bg-accent-dark transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;