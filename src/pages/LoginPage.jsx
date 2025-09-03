import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Ta reda på var användaren kom ifrån, så vi kan skicka tillbaka dem dit
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const loggedIn = login(email, password);

    if (loggedIn) {
      navigate(from, { replace: true });
    } else {
      setError(
        'Fel e-post eller lösenord. Försök med user@example.com och password123.'
      );
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='p-8 bg-white rounded-lg shadow-md w-full max-w-md'>
        <div className='text-center mb-4'>
          <Link to='/' className='text-3xl tracking-wide font-bold'>
            Voyager<span className='inline-block ml-1'>✈</span>
          </Link>
        </div>
        <h1 className='text-2xl font-bold text-center mb-6'>
          Logga in på ditt konto
        </h1>
        <p className='text-center text-gray-500 mb-4'>
          (Testa med: <strong>user@example.com</strong> /{' '}
          <strong>password123</strong>)
        </p>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              E-post
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border rounded-md'
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 mb-2' htmlFor='password'>
              Lösenord
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 border rounded-md'
              required
            />
          </div>
          {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
          <button
            type='submit'
            className='w-full bg-[#FF8C00] text-white py-2 rounded-md hover:bg-[#e07b00] transition'
          >
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
}
