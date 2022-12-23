 import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import { useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';

export default function ServerPage() {
  const [serverName, setServerName] = useState('');
  const [serverDescription, setServerDescription] = useState('');
  const [serverPrivate, setServerPrivate] = useState('false');
  const [serverPassword, setServerPassword] = useState('');
  const { data: publicServers } = trpc.servers.getAllServers.useQuery();
  const { data: sessionData} = useSession();
  const addRouter = trpc.servers.createServer.useMutation();

 

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ serverName, serverDescription, serverPrivate, serverPassword });
    if (sessionData?.user?.id){
      addRouter.mutate({name: serverName, description: serverDescription, passcode: serverPassword, private: eval(serverPrivate), adminUserId: sessionData.user.id })
    }
  }

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center">
 

      <form
      className='max-w-[900px] p-4 m-5 md:border rounded-md  border-black  flex flex-col items-center'
       onSubmit={handleSubmit}>
          <h2 className='text-3xl mb-6'>Create A Race</h2>
        <label className='text-center flex flex-col text-2xl  font-black tracking-tight'>
          Server Name:
          <input
            type="text"
            className='mx-4 boxshadow border-2 border-black p-4 rounded-md font-bold text-xl'
            value={serverName}
            onChange={event => setServerName(event.target.value)}
          />
        </label>
        <br />
        <label className='text-center flex flex-col text-2xl font-black tracking-tight'>
          Server Description:
          <textarea
          className='mx-4 boxshadow border-2 border-black p-4 rounded-md font-bold text-x'
            value={serverDescription}
            onChange={event => setServerDescription(event.target.value)}
          />
        </label>
        <br />
        <label
          className='text-center text-2xl font-black tracking-tight'
        >
          Server Privacy:
          <div className="flex gap-2 text-lg font-normal">
              <input
                type="radio"
                name="serverPrivacy"
                value="false"
                checked={serverPrivate === 'false'}
                onChange={event => setServerPrivate(event.target.value)}
              />
              Public
          </div>
          <div className="flex gap-2 text-lg font-normal">
              <input
                type="radio"
                name="serverPrivacy"
                value="true"
                checked={serverPrivate === 'true'}
                onChange={event => setServerPrivate(event.target.value)}
              />
              Private
          </div>

        </label>
        <br />
       { eval(serverPrivate) && <label className='text-center flex flex-col text-2xl  font-black tracking-tight'>
          Server Name:
          <input
            type="text"
            className='mx-4 boxshadow border-2 border-black p-4 rounded-md font-bold text-xl'
            value={serverPassword}
            onChange={event => setServerPassword(event.target.value)}
          />
        </label>}
        <br />
        <button
          className='boxshadow text-center  w-fit px-4   font-bold p-2 border-2 text-xl  rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]'
         type="submit">Submit</button>
      </form>

      <div className="flex flex-col w-11/12 max-w-[1000px] text-left">
        <h2 className='text-center flex flex-col text-2xl  font-black tracking-tight'>All servers</h2>

<table className='flex flex-col border-4 border-black boxshadow rounded-md '>

        { 

        publicServers?.map((server, index) => (
          <tr key={index} className={`grid grid-cols-4 border-2 border-neutral-400 p-4 ${index % 2 === 0 && 'bg-neutral-100'}`} >
          <td>{server.name}</td>
          <td>{server.description}</td>
          <td>{server.private ? 'private' : 'public'}</td>
          <td>{server.passcode}</td>
          </tr>
        ))}

        </table>
      </div>
    </div>
    </>
  );
}
