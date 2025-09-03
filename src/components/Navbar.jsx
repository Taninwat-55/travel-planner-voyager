import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='w-full bg-white py-6 px-10 relative'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        {/* Left Menu (takes up 1/3 of the space) */}
        <div className='flex-1'>
          <ul className='flex gap-8 text-black text-lg font-light'>
            <li className='hover:-translate-y-1 hover:scale-110 transition-transform duration-200'>
              <Link to='/explore'>Explore</Link>
            </li>
            <li className='hover:-translate-y-1 hover:scale-110 transition-transform duration-200'>
              <Link to='/flights'>Flights</Link>
            </li>
            <li className='hover:-translate-y-1 hover:scale-110 transition-transform duration-200'>
              <Link to='/stays'>Stays</Link>
            </li>
          </ul>
        </div>

        {/* Center Logo (takes up 1/3 of the space and is centered) */}
        <div className='flex-1 text-center'>
          <Link to='/' className='text-3xl tracking-wide font-bold'>
            Voyager<span className='inline-block ml-1'>✈</span>
          </Link>
        </div>

        {/* Right Menu (takes up 1/3 of the space, content pushed to the right) */}
        <div className='flex-1 flex justify-end'>
          <ul className='flex gap-8 text-black text-lg font-light'>
            <li className='hover:-translate-y-1 hover:scale-110 transition-transform duration-200'>
              <Link to='/favorites'>Favorites</Link>
            </li>
            <li className='hover:-translate-y-1 hover:scale-110 transition-transform duration-200'>
              <Link to='/travel-plan'>My Plan</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Centered Half-Line */}
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] border-b border-gray-200'></div>
    </nav>
  );
}

export default Navbar;
