import { useRouter } from 'next/router'
import Navbar from '../../../components/NewNav';
import { trpc } from '../../../utils/trpc';
import ServerUserRow from '../../../components/ServerUserRow';
import type { User } from '@prisma/client';
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';

export default function ServerPage() {
  const {data: sessionData } = useSession()

  const { data: yourShelf } = trpc.example.getUserBooks.useQuery(sessionData?.user?.id || 'nouser');



  const [pagesRead, setPagesRead] = useState(0)

  useEffect(() => {
 
  
    let all = 0
    yourShelf?.forEach(book => {
     book.read ? all += Number(book.pages) : ''
              })
 
    setPagesRead(all)

    
  }, [yourShelf])

  const router = useRouter()
  const { id } = router.query
  
  const { data: serverData } = trpc.servers.getSingleServer.useQuery(id as string)

  console.log(serverData)
  
  const { data: serverUsers } = trpc.servers.getServerUsers.useQuery(id as string)
  
  const usersWithData = serverUsers?.map(
    (user, index) => {
      const thisPeriod = user.books
      let total = 0;
      thisPeriod.forEach(book => {
        if (book.read && book.startedAt && book.finishedAt && serverData && serverData.startDate && serverData.endDate && book.startedAt > serverData.startDate && book.finishedAt < serverData.endDate ){
        total += Number(book.pages)
        }
      })
    

     return( <ServerUserRow data-count={total} key={index} userId={user.id} server={{startDate: serverData?.startDate as Date, endDate: serverData?.endDate as Date}} user={user}   />)
    }
  
    )
    console.log('yo')
    console.log(usersWithData?.forEach(book => console.log(book.props["data-count"])))
    const letsgo = usersWithData?.sort((a,b) => b.props["data-count"] - a.props["data-count"] )
    console.log(letsgo)

  



  return (
    
  
    <div className=''>
      <Navbar pagesRead={pagesRead} />
      <div className="flex flex-col p-4 max-w-[1000px] mx-auto">
          <h1 className='mt-24 flex justify-between'><span className="font-bold">Server ID: </span>{serverData?.id}</h1>
          <p className='flex justify-between'><span className="font-bold">Description: </span>{serverData?.description}</p>
          <p className='flex justify-between'><span className="font-bold">Server Name: </span>{serverData?.name}</p>
          <p className='flex justify-between'><span className="font-bold">Race Start: </span>{serverData?.startDate?.toDateString()|| 'No specified start date'}</p>
          <p className='flex justify-between'><span className="font-bold">Race End: </span>{serverData?.endDate?.toDateString() || 'No specified end date'}</p>
      
          <p className='flex justify-between'><span className="font-bold">Privacy: </span>{serverData?.private ? "private" : "public"}</p>
      </div>
      <ol className='list-decimal'>
 
      {letsgo}
      </ol>
    
    </div>
  )
}



//  function Date({ dateString }) {
//   const date = parseISO(dateString);
//   return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
// }