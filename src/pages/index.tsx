import { type NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
// import  Navbar  from "../components/Navbar";
import NewNav from "../components/NewNav"

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  const { data: yourShelf } = trpc.example.getUserBooks.useQuery(sessionData?.user?.id || 'nouser');



  const [pagesRead, setPagesRead] = useState(0)

  useEffect(() => {
 
  
    let all = 0
    yourShelf?.forEach(book => {
     book.read ? all += Number(book.pages) : ''
              })
 
    setPagesRead(all)

    
  }, [yourShelf])


  return (
    <div className="">
            <Head>
        <title>BookRace</title>
        <meta name="description" content="BookRace lets you compete in reading races against your friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar /> */}
      <NewNav pagesRead={pagesRead}/>
      <main className="flex flex-col h-11/12 items-center py-24 justify-center bg-yellow-50 min-h-screen">
        <div className="container flex flex-col items-center justify-center px-4 my-4">
          <h1 className="text-5xl font-extrabold tracking-tight m-1 text-black sm:text-[5rem] ">
            Page<span className="">Race</span>
          </h1>
          <p className="text-2xl font-black ">Read your way to victory!</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">          
            <Link
              className="bg-slate-50 flex max-w-xs flex-col gap-6 boxshadow rounded-lg p-6 hover:border-4  hover:bg-white border-4 border-black"
              href="/booksearch"
        
            >
              <h3 className="text-2xl font-bold">Search Books →</h3>
              <div className="text-lg">
                Find books to add to your shelf and track your reading progress.
              </div>
            </Link>

            <Link
              className="bg-slate-50 flex max-w-xs flex-col gap-1 boxshadow rounded-lg p-6  hover:bg-white border-4 border-black"
              href="/shelf"
        
            >
              <h3 className="text-2xl font-bold ">Your Shelf →</h3>
              <div className="text-lg">
               View your shelf & track your reading Progress
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2 mt-4">
            {/* <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <p className="text-2xl text-white">
              {getAll.data ? 'hi' : "Loading tRPC query..."}
            </p> */}
            <AuthShowcase />
          </div>
      </main>
    </div>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* <p className="text-center text-2xl ">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
        
      </p> */}
      <button
        className="bg-yellow-400 rounded-md border-black border-4 px-10 py-3 boxshadow font-extrabold no-underline transition hover:bg-yellow-300"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
   
    </div>
  );
};
