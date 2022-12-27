import type { User } from "@prisma/client"
import { trpc } from "../utils/trpc"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowUp, faHouse, faBookBookmark, faBook, faFlagCheckered, faMagnifyingGlass, faRightFromBracket, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const ServerUserRow = ({userId, user}: {userId: string, user: User}) => {
    const { data: serverData } = trpc.servers.getServerUserBooks.useQuery(userId)
    let totalPages = 0
    const [bookVistible, setBookVisible] = useState(false)

   



  
    serverData?.forEach(book => totalPages += Number(book.pages))
   return( 
   <li className="px-4 py-1 gap-4 w-full border flex flex-col  list-inside" data-count={totalPages} >

    <div className="flex justify-between w-full">
      <div className="flex gap-4">
        <p className="border rounded-full px-3 bg-green-500 font-semibold list-item">{}</p>
            <p className="">{user.name}</p>
      </div>
    <div className="flex items-center">
      <p className="">{totalPages}</p>
      <FontAwesomeIcon icon={faBook} className="px-2 hover:opacity-70" onClick={() => setBookVisible(!bookVistible) } />
    </div>
    </div>
    <ul className={`w-[100%] mb-2 ${bookVistible ? 'block': 'hidden' }`}>
    { 
    serverData?.map((book, index) =>  (<li key={index} className={`px-4 py-2 flex justify-between ${index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200'}`}><p>{book.title}</p><p>{book.pages}</p></li>)
    ) }
    { totalPages === 0 && 'No completed book in this period.'}
    </ul>
    {/* {serverData?.map((book) => {
      <p> {book.title}</p> 
    })} */}
    </li>)
}

export default ServerUserRow