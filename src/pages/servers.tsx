 import React, { useState } from 'react';
import { trpc } from '../utils/trpc';

export default function ServerPage() {
  const [serverName, setServerName] = useState('');
  const [serverDescription, setServerDescription] = useState('');
  const [serverPrivate, setServerPrivate] = useState('false');

  const addRouter = trpc.servers.createServer.useMutation()

 

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ serverName, serverDescription, serverPrivate });
    addRouter.mutate({name: serverName, description: serverDescription, private: Boolean(serverPrivate), adminUserId: "clbv2cfr700009fvsvz5s2v7s" })
  }

  return (
    <form
    className='max-w-[400px] p-4 m-4 rounded-md boxshadow border-4 border-black  mx-auto flex flex-col items-center'
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
      <button
        className='boxshadow text-center  w-fit px-4   font-bold p-2 border-2 text-xl  rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]'
       type="submit">Submit</button>
    </form>
  );
}
