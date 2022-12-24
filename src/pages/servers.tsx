 import React, { useState, useEffect } from 'react';
import { trpc } from '../utils/trpc';
import { useSession } from 'next-auth/react';
import Navbar from '../components/NewNav';

export default function ServerPage() {
  const [serverName, setServerName] = useState('');
  const [serverDescription, setServerDescription] = useState('');
  const [serverPrivate, setServerPrivate] = useState('false');
  const [serverPassword, setServerPassword] = useState('');
  const { data: publicServers } = trpc.servers.getAllServers.useQuery();
  const { data: sessionData} = useSession();
  const addRouter = trpc.servers.createServer.useMutation();
  const [formOpen, setFormOpen] = useState(false)

  const { data: yourShelf } = trpc.example.getUserBooks.useQuery(sessionData?.user?.id || 'nouser');
  const [pagesRead, setPagesRead] = useState(0)

  useEffect(() => {
    console.log('here')
 
    let all = 0
    yourShelf?.forEach(book => {
     book.read ? all += Number(book.pages) : ''
              })
  
    setPagesRead(all)

    
  }, [yourShelf])
 

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ serverName, serverDescription, serverPrivate, serverPassword });
    if (sessionData?.user?.id){
      addRouter.mutate({name: serverName, description: serverDescription, passcode: serverPassword, private: eval(serverPrivate), adminUserId: sessionData.user.id })
      setFormOpen(!formOpen)
      window.location.reload()
    }
  }

  return (
   

    <>
    <Navbar pagesRead={pagesRead}  />
    <div className="w-[100vw] flex flex-col bg-neutral-100 min-h-screen ">
 

      <form
      className={`mx-auto h-0 w-full  bg-neutral-100 mt-[60px] scale-0   ${formOpen ? 'scale-100 min-h-screen' : 'scale-0'} swoopIn transition duration-200 ease-in-out transform      rounded-md  flex-col items-center`}
      // style={{ display: formOpen ? 'block' : 'hidden' }}
       onSubmit={handleSubmit}>
          <div className="flex flex-col md:border-4 rounded-md border-black w-fit mx-auto items-center mt-10 p-4  ">
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
                    <div className="flex gap-4">
                      <button
                                  className='boxshadow text-center  w-fit px-4   font-bold p-2 border-2 text-xl  rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]'
                       type="submit">Submit</button>
                      <button
                      onClick={(formOpen) => setFormOpen(!formOpen)}
                                  className='boxshadow text-center  w-fit px-4   font-bold p-2 border-2 text-xl  rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]'
                       type="button">Cancel</button>
                    </div>
          </div>
      </form>

      <div className="text-left w-screen flex flex-col p-2 items-center justify-center">
        <div className="flex flex-col  gap-4 justify-center items-center">
          <h2 className='text-center text-2xl font-extrabold tracking-tight mt-8'>All servers</h2>
          <button className='font-bold w-fit mx-auto mb-3 p-2 boxshadow rounded-md border-4 border-black' onClick={() => setFormOpen(!formOpen)}>Add a server</button>
        </div>

<table className='flex flex-col max-w-[1200px] mx-auto '>
  <thead>
    <tr className='grid grid-cols-4 p-1 rounded-t-lg bg-black text-white'>
      <th>Server Name</th>
      <th>Description</th>
      <th>Privacy</th>
      <th>Passcode</th>
    </tr>
  </thead>
    <tbody>
        { 

        publicServers?.map((server, index) => (
          <tr key={index} className={`grid grid-cols-4 p-1 ${index % 2 === 0 && 'bg-neutral-300'} last:rounded-b-lg`} >
          <td>{server.name}</td>
          <td>{server.description}</td>
          <td>{server.private ? 'prv' : 'pub'}</td>
          <td>{server.passcode}</td>
          </tr>
        ))}
</tbody>
        </table>
      </div>
    </div>
    </>
  );
}
