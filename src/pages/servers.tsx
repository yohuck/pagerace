 import React, { useState, useEffect } from 'react';
import { trpc } from '../utils/trpc';
import { useSession } from 'next-auth/react';
import Navbar from '../components/NewNav';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faBars, faArrowUp, faHouse, faBookBookmark, faBook, faFlagCheckered, faMagnifyingGlass, faRightFromBracket, faRightToBracket} from '@fortawesome/free-solid-svg-icons';




export default function ServerPage() {
  const [serverName, setServerName] = useState('');
  const [serverDescription, setServerDescription] = useState('');
  const [serverPrivate, setServerPrivate] = useState('false');
  const [serverPassword, setServerPassword] = useState('');
  const [serverStartDate, setServerStartDate] = useState('');
  const [ altServerStartDate, setAltServerStartDate] = useState(new Date())
  const [serverEndDate, setServerEndDate] = useState('');
  const { data: publicServers } = trpc.servers.getAllServers.useQuery();
  const { data: sessionData} = useSession();
  const addRouter = trpc.servers.createServer.useMutation();
  const [formOpen, setFormOpen] = useState(false)

  const { data: yourShelf } = trpc.example.getUserBooks.useQuery(sessionData?.user?.id || 'nouser');
  const joinServer = trpc.servers.joinServer.useMutation()
  const [pagesRead, setPagesRead] = useState(0)

  useEffect(() => {
    let all = 0
    yourShelf?.forEach(book => {
     book.read ? all += Number(book.pages) : ''
              })
    setPagesRead(all)
  }, [yourShelf])
 

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sessionData?.user?.id){
      console.log(serverStartDate)
      addRouter.mutate({name: serverName, description: serverDescription, passcode: serverPassword, private: eval(serverPrivate), adminUserId: sessionData.user.id, startDate: new Date(serverStartDate), endDate: new Date(serverEndDate) })
      setFormOpen(!formOpen)
      window.location.reload()
    }
  }

  return (
   

    <>
    <Navbar pagesRead={pagesRead}  />
    <div className="w-[100vw] flex flex-col bg-neutral-100 min-h-screen ">
 

      <form
      className={`mx-auto h-0 w-full max-w-[500px]  bg-neutral-100 mt-[60px] scale-y-0  ${formOpen ? 'scale-y-100 min-h-screen' : 'scale-y-0'} swoopIn duration-40 ease-in transform      rounded-md  flex-col items-center`}
      // style={{ display: formOpen ? 'block' : 'hidden' }}
       onSubmit={handleSubmit}>
          <div className="flex flex-col rounded-md bg-neutral-100 border-black w-[100%] mx-auto items-center mt-4 p-4  ">
            <h2 className='text-3xl mb-4 font-extrabold'>Create A Race</h2>
                    <label className='text-center flex flex-col items-center w-[100%] text-lg font-bold tracking-tight'>
            Title:
            <input
              type="text"
              className='mx-4 boxshadow border-2 w-[100%] border-black p-2 rounded-md'
              value={serverName}
              onChange={event => setServerName(event.target.value)}
            />
                    </label>
                    <br />
                    <label className='text-center w-[100%] text-lg flex flex-col items-center font-bold tracking-tight'>
            Server Description:
            <textarea
            className='mx-4 boxshadow border-2 w-[100%] border-black p-2 rounded-md font-bold'
              value={serverDescription}
              onChange={event => setServerDescription(event.target.value)}
            />
                    </label>
                    <br />
                    <label className='text-center w-[100%] flex flex-col font-bold text-lg tracking-tight'>
            Start Date:
            <input
            type="date"
            className='boxshadow border-2 border-black p-4 rounded-md font-bold'
              value={serverStartDate}
              onChange={event => {
              
                setServerStartDate(event.target.value)
               
              }}
            />
                    </label>
                    <br />
                    <label className='text-center flex flex-col w-[100%] text-lg font-bold tracking-tight'>
            End Date:
            <input
            type="date"
            className='boxshadow border-2 border-black p-4 rounded-md font-bold'
              value={serverEndDate}
              onChange={event => setServerEndDate(event.target.value)}
            />
                    </label>
                    <br />

                    <br />
                    <label
            className='text-center text-lg font-bold tracking-tight'
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
                   { eval(serverPrivate) && <label className='text-center flex flex-col items-center text-lg w-[100%]  font-bold tracking-tight'>
            Passcode:
            <input
              type="text"
              className='mx-4 boxshadow border-2 border-black p-4 w-[100%] rounded-md font-bold text-xl'
              value={serverPassword}
              onChange={event => setServerPassword(event.target.value)}
            />
                    </label>}
                    <br />
                    <div className="flex gap-4">
                      <button
                                  className='boxshadow text-center  w-fit px-4 bg-gradient-to-tl from-yellow-400 to-amber-400   font-bold p-2 border-2 text-xl  rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]'
                       type="submit">Submit</button>
                      <button
                      onClick={(formOpen) => setFormOpen(!formOpen)}
                                  className='boxshadow text-center  w-fit px-4 bg-gradient-to-tl from-red-500 to-red-400   font-bold p-2 border-2 text-xl  rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]'
                       type="button">Cancel</button>
                    </div>
          </div>
      </form>

      <div className="text-left w-screen flex flex-col items-center justify-center">
        <div className="flex flex-col  gap-4 justify-center items-center">
          {/* <h2 className='text-center text-2xl font-extrabold tracking-tight mt-8'>All servers</h2> */}
         
        </div>

<table className={`flex flex-col w-full max-w-[1000px]  mx-auto ${formOpen && 'hidden'}`}>
  <thead>
    <tr className='flex justify-between items-center sticky w-full p-3   bg-yellow-400 mt-8'>
      <th className='font-black text-xl'>Join a race</th>
      {/* <th>Privacy</th> */}
      <th></th>
      <th  > <button  className='p-3 text-xs flex gap-2 items-center text-neutral-900 font-extrabold rounded-md border-2 border-neutral-900' onClick={() => setFormOpen(!formOpen)}>Add Race <FontAwesomeIcon icon={faFlagCheckered}/>  </button></th>

    </tr>
  </thead>
    <tbody className=''>
        { 

        publicServers?.map((server, index) => (
          <tr key={index} className={`flex justify-between items-center gap-2 p-2  ${index % 2 === 0 && 'bg-neutral-300'}`} >
          <td className='w-[100%]'>{server.name}</td>
         
          <td className='w-[40%]'>{server.private ? 'Private' : 'Public'}</td>
          <td className=''><button onClick={() => joinServer.mutate({userId: sessionData?.user?.id as string, serverId: server.id, passcode: ''})} className={'font-bold border-2 py-2 px-4 bg-yellow-400 border-black rounded-md'}>Join</button></td>
          <td><button className='font-bold py-2 border-2 px-4 bg-neutral-900 text-yellow-400 border-black rounded-md'><Link href={`/race/${server.id}`} className={''}>View</Link></button></td>
          </tr>
        ))}
    </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
