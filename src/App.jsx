import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div className='bg-slate-100 min-h-screen'>
      <header className='p-8 bg-white shadow-md flex justify-between items-center'>
        <Link to='/'>
          <h1 className='text-4xl font-bold text-slate-800'>Travel Planner</h1>
        </Link>
        <nav>
          <Link
            to='/favorites'
            className='text-slate-600 hover:text-sky-600 font-semibold'
          >
            Mina favoriter
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
