import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Importera den nya hooken

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Skicka användaren till startsidan efter utloggning
  };

  return (
    <nav className='w-full bg-white py-6 px-10 relative'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        {/* Vänster meny */}
        <div className='flex-1'>
          <ul className='flex gap-8 text-black text-lg font-light'>
            <li className='hover:-translate-y-1 hover:scale-110 transition-transform duration-200'>
              <Link to='/explore'>Explore</Link>
            </li>
            <li className='hover:-translate-y-1 hover:scale-110 transition-transform duration-200'>
              <Link to='/stays'>Stays</Link>
            </li>
          </ul>
        </div>

        {/* Center Logo */}
        <div className='flex-1 text-center'>
          <Link to='/' className='text-3xl tracking-wide font-bold'>
            Voyager<span className='inline-block ml-1'>✈</span>
          </Link>
        </div>

        {/* Höger meny - Logiken är ändrad här */}
        <div className='flex-1 flex justify-end'>
          <ul className='flex gap-8 text-black text-lg font-light items-center'>
            {isAuthenticated ? (
              <>
                <li className='hover:-translate-y-1 hover:scale-110 transition-transform duration-200'>
                  <Link to='/favorites'>Favorites</Link>
                </li>
                <li className='hover:-translate-y-1 hover:scale-110 transition-transform duration-200'>
                  <Link to='/travel-plan'>My Plan</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className='bg-slate-200 px-4 py-2 rounded-md hover:bg-slate-300 transition'
                  >
                    Logga ut
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to='/login' className='bg-[#FF8C00] text-white px-4 py-2 rounded-md hover:bg-[#e07b00] transition'>
                  Logga in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] border-b border-gray-200'></div>
    </nav>
  );
}

export default Navbar;