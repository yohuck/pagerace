import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import  Navbar  from "../components/Navbar";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "is this thing on" });
  const getAll = trpc.example.getUsers.useQuery();
  console.log(getAll.data)

  return (
    <>
            <Head>
        <title>BookRace</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="my-[-4rem] flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-neutral-200 to-slate-200">
        
        <div className="container flex flex-col items-center justify-center px-4 py-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem] ">
            Book<span className="">Race</span>
          </h1>
          <p className="text-2xl font-black ">Read your way to victory!</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {/* {getAll.data?.map((user) => (
              <div key={user.id} className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            ))} */}
          
            <Link
              className="bg-white flex max-w-xs flex-col gap-4 boxshadow rounded-xl p-4  hover:bg-white/20 border-2 border-black"
              href="/booksearch"
        
            >
              <h3 className="text-2xl font-bold">Search Books →</h3>
              <div className="text-lg">
                Find books to add to your shelf and track your reading progress.
              </div>
            </Link>

            <Link
              className="bg-white flex max-w-xs flex-col boxshadow gap-4 rounded-xl p-4  hover:bg-white/20 border-2 border-black"
              href="/booksearch"
        
            >
              <h3 className="text-2xl font-bold">Register →</h3>
              <div className="text-lg">
               Create a profile to start tracking your reading progress.
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
    </>
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
      <p className="text-center text-2xl ">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
        
      </p>
      <button
        className="bg-white rounded-md border-black border-2 px-10 py-3 boxshadow font-semibold no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
   
    </div>
  );
};
