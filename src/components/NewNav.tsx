import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowUp, faHouse, faBookBookmark, faBook, faFlagCheckered, faMagnifyingGlass, faRightFromBracket, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CountUp from 'react-countup';

import { trpc } from '../utils/trpc';
import { useSession, signIn, signOut } from 'next-auth/react';



const BurgerMenu = ( {pagesRead}: {pagesRead: number}) => {

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (nav) {
        if (window.scrollY > 0) {
          nav.classList.add('border-b', 'bg-white');
    
        } else {
          nav.classList.remove('border-b', 'bg-white');
   
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
 

    const { data: sessionData } = useSession();
    const { data: yourShelf } = trpc.example.getUserBooks.useQuery(sessionData?.user?.id || 'nouser');
    const [pagesRead2, setPagesRead2] = useState(0)

    const navRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        console.log('here')

        let all = 0
        yourShelf?.forEach(book => {
         book.read ? all += Number(book.pages) : ''
                  })
   
        setPagesRead2(all)
    
        
      }, [yourShelf])



    const router = useRouter()
    console.log(router.pathname)
  const [isOpen, setIsOpen] = useState(false);

    

  return (
    <div className={`flex w-full justify-between items-center fixed z-50  border-black`} ref={navRef} >
                  <div className="flex gap-2 py-2 justify-center items-center">
                  <h1 className="p-1 text-2xl mt-[-0.3rem] ml-2 font-extrabold tracking-tight text-black">
                                  Book<span className="block mt-[-.8rem]">Race</span>
                                </h1>
                                <div className="bg-white p-2 m-2 h-fit rounded-md flex items-center justify-between gap-2  border-4 border-yellow-400">
                                    <FontAwesomeIcon icon={faBook} size="xl" className=" my-1" />
                                       <CountUp  start={pagesRead2} end={pagesRead} duration={1} className="font-extrabold" />
                                </div>
                        
                  </div>
          <div className="flex gap-3">
 
    
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className={`text-black  z-1000 px-4 hover:text-gray-800 z-50 transition-all focus:outline-none focus:text-gray-800 ${isOpen ? 'animate-pulse z-50 translate-y-[0rem]' : 'translate-y-[0rem]'}`}>
                      {/* <p className='font-extrabold p-4 boxshadow bg-white  border-black rounded-md border-4'>{isOpen ? 'Close' : 'Menu'} </p> */}
                      <FontAwesomeIcon size='xl' icon={isOpen ? faArrowUp : faBars} />
                    </button>
          </div>
      <div
        className={`${
          isOpen ? 'block translate-y-[100vh]' : 'block '
        } w-64 bg-slate-200 border-l-4 border-black transition-all top-[-100vh] rounded-md shadow-md h-full z-500 py-2 pt-6 fixed right-0`}
      >
        <Link href="/" className={`px-4 py-2 flex gap-4 items-center text-gray-800 hover:bg-gray-300 ${router.pathname === '/' && 'font-extrabold'}`} onClick={() => setIsOpen(false)}>
        <FontAwesomeIcon icon={faHouse} size="lg" className=" my-1" />
          Home
      
        </Link>
        <Link href="/booksearch" className={`flex gap-4 items-center px-4 py-2 text-gray-800 hover:bg-gray-300 ${router.pathname === '/booksearch' && 'font-extrabold'}`} onClick={() => setIsOpen(false)}>
        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className=" my-1" />
          Book Search
        </Link>
      
        <Link href="/shelf" className={`flex gap-4 items-center px-4 py-2 text-gray-800 hover:bg-gray-300 ${router.pathname === '/shelf' && 'font-extrabold'}`} onClick={() => setIsOpen(false)}>
        <FontAwesomeIcon icon={faBookBookmark} size="lg" className=" my-1" />
          Your Shelf
        </Link>
        <Link href="/servers" className={`flex gap-4 items-center px-4 py-2 text-gray-800 hover:bg-gray-300 ${router.pathname === '/servers' && 'font-extrabold'}`} onClick={() => setIsOpen(false)}>
        <FontAwesomeIcon icon={faFlagCheckered} size="lg" className=" my-1" />
          Races
        </Link>
        <button
        className='flex gap-4 items-center px-4 py-2 text-gray-800 hover:bg-gray-300'
         onClick={sessionData ? () => signOut() : () => signIn()}>
        <FontAwesomeIcon icon={sessionData?.user ? faRightFromBracket : faRightToBracket} size="lg" className=" my-1" />
          {sessionData?.user ? 'Log Out' : "Log In"}
        </button>

      </div>
    </div>
  );
};

export default BurgerMenu;
