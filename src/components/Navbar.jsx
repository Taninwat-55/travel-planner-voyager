import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='w-full max-w-8xl flex justify-between items-center py-6 px-6 relative bg-white'>
      {/* Left Menu */}
      <ul className='flex gap-8 text-black text-lg font-light ml-20'>
        <li className='cursor-pointer hover:-translate-y-1 hover:scale-110 hover:font-semibold hover:text-black transition-transform duration-200'>
          <Link to='/explore'>Explore</Link>
        </li>
        <li className='cursor-pointer hover:-translate-y-1 hover:scale-110 hover:font-semibold hover:text-black transition-transform duration-200'>
          <Link to='/flights'>Flights</Link>
        </li>
        <li className='cursor-pointer hover:-translate-y-1 hover:scale-110 hover:font-semibold hover:text-black transition-transform duration-200'>
          <Link to='/stays'>Stays</Link>
        </li>
      </ul>

      {/* Center Logo */}
      <h1 className='absolute left-1/2 transform -translate-x-1/2 text-3xl tracking-wide cursor-pointer'>
        <Link to='/'>
          {' '}
          Voyager<span className='inline-block ml-'>✈</span>
        </Link>
      </h1>

      {/* Centered Half-Line */}
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 border-b border-black'></div>
    </nav>
  );
}

export default Navbar;
