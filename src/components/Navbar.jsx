import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="w-full bg-white py-6 px-4 md:px-10 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Hamburger Menu Button & Left Links (Mobile) */}
        <div className="md:hidden">
          <button
            className="text-black cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Links (Left) */}
        <ul className="hidden md:flex flex-1 gap-8 text-black text-lg font-bold">
          <li className="hover:-translate-y-1 hover:scale-110 transition-transform duration-200">
            <Link to="/explore">Utforska</Link>
          </li>
          <li className="hover:-translate-y-1 hover:scale-110 transition-transform duration-200">
            <Link to="/stays">Boenden</Link>
          </li>
        </ul>

        {/* Center Logo (Desktop & Mobile) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 md:flex-1 md:text-center">
          <Link to="/" className="text-2xl sm:text-3xl tracking-wide font-bold">
            Voyager<span className="inline-block ml-1">✈</span>
          </Link>
        </div>

        {/* Right Links (Desktop) */}
        <div className="hidden md:flex flex-1 justify-end">
          <ul className="flex gap-8 text-black text-lg font-bold items-center">
            {isAuthenticated ? (
              <>
                <li className="hover:-translate-y-1 hover:scale-110 transition-transform duration-200">
                  <Link to="/favorites">Favoriter</Link>
                </li>
                <li className="hover:-translate-y-1 hover:scale-110 transition-transform duration-200">
                  <Link to="/travel-plan">Min Resplan</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-slate-200 px-4 py-2 rounded-md hover:bg-slate-300 transition font-bold"
                  >
                    Logga ut
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="bg-[#FF8C00] text-white px-4 py-2 rounded-md hover:bg-[#e07b00] transition font-bold"
                >
                  Logga in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 z-10">
          <ul className="flex flex-col items-center gap-4 text-black text-lg font-bold">
            <li className="hover:bg-gray-100 w-full text-center py-2">
              <Link to="/explore" onClick={() => setIsMenuOpen(false)}>
                Utforska
              </Link>
            </li>
            <li className="hover:bg-gray-100 w-full text-center py-2">
              <Link to="/stays" onClick={() => setIsMenuOpen(false)}>
                Boenden
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="hover:bg-gray-100 w-full text-center py-2">
                  <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>
                    Favoriter
                  </Link>
                </li>
                <li className="hover:bg-gray-100 w-full text-center py-2">
                  <Link to="/travel-plan" onClick={() => setIsMenuOpen(false)}>
                    Min Resplan
                  </Link>
                </li>
                <li className="w-full text-center py-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-slate-200 px-4 py-2 rounded-md hover:bg-slate-300 transition font-bold"
                  >
                    Logga ut
                  </button>
                </li>
              </>
            ) : (
              <li className="w-full text-center py-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#FF8C00] text-white px-4 py-2 rounded-md hover:bg-[#e07b00] transition font-bold"
                >
                  Logga in
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] border-b border-gray-200"></div>
    </nav>
  );
}

export default Navbar;