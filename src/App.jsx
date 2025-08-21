import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='bg-slate-100 min-h-screen'>
      <header className='p-8 bg-white shadow-md'>
        <h1 className='text-4xl font-bold text-slate-800'>Travel Planner</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;