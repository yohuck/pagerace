import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowUp, faHouse} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';



const BurgerMenu = () => {
    const router = useRouter()
    console.log(router.pathname)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full justify-between fixed border-b-2 z-50 bg-neutral-300 border-black">
                  <h1 className="p-4 text-2xl font-extrabold tracking-tight text-black">
            Book<span className="">Race</span>
          </h1>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-black  z-1000 px-4 hover:text-gray-800 z-50 transition-all focus:outline-none focus:text-gray-800 ${isOpen ? 'animate-pulse z-50 translate-y-[0rem]' : 'translate-y-[0rem]'}`}
      >
        <FontAwesomeIcon size='xl' icon={isOpen ? faArrowUp : faBars} />
      </button>
      <div
        className={`${
          isOpen ? 'block translate-y-[100vh]' : 'block '
        } w-48 bg-slate-200 border-l-4 border-black transition-all top-[-100vh] rounded-md shadow-md h-full z-500 py-2 pt-6 fixed right-0`}
      >
        <Link href="/" className={`block px-4 py-2 text-gray-800 hover:bg-gray-300 ${router.pathname === '/' && 'font-extrabold'}`} onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link href="/booksearch" className={`block px-4 py-2 text-gray-800 hover:bg-gray-300 ${router.pathname === '/booksearch' && 'font-extrabold'}`} onClick={() => setIsOpen(false)}>
          Book Search
        </Link>
        <Link href="/shelf" className={`block px-4 py-2 text-gray-800 hover:bg-gray-300 ${router.pathname === '/shelf' && 'font-extrabold'}`} onClick={() => setIsOpen(false)}>
          Shelf
        </Link>
        <Link href="/servers" className={`block px-4 py-2 text-gray-800 hover:bg-gray-300 ${router.pathname === '/servers' && 'font-extrabold'}`} onClick={() => setIsOpen(false)}>
          Servers
        </Link>

      </div>
    </div>
  );
};

export default BurgerMenu;
