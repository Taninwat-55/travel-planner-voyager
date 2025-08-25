import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='bg-slate-100 min-h-screen'>
      <Navbar />
      <main>
        <Outlet />
      </main>

    </div>
  );
}

export default App;