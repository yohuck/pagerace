import { useRouter } from 'next/router'
import Link from 'next/link'
import Navbar from '../../../components/NewNav';
import { trpc } from '../../../utils/trpc';
import { parseISO, format } from 'date-fns';

export default function PostPage() {
  const router = useRouter()
  const { id } = router.query
  const { data: serverData } = trpc.servers.getSingleServer.useQuery(id as string)

  return (
  
    <div className=''>
      <Navbar pagesRead={0} />
      <div className="flex flex-col p-4">
          <h1 className='mt-24 flex justify-between'><span className="font-bold">Server ID: </span>{serverData?.id}</h1>
          <p className='flex justify-between'><span className="font-bold">Description: </span>{serverData?.description}</p>
          <p className='flex justify-between'><span className="font-bold">Server Name: </span>{serverData?.name}</p>
          <p className='flex justify-between'><span className="font-bold">Started At: </span>{serverData?.createdAt.toLocaleDateString()}</p>
          <p className='flex justify-between'><span className="font-bold">Privacy: </span>{serverData?.private ? "private" : "public"}</p>
      </div>
    </div>
  )
}



//  function Date({ dateString }) {
//   const date = parseISO(dateString);
//   return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
// }