import type { User } from "@prisma/client"
import { trpc } from "../utils/trpc"
import { useRef } from "react"

const ServerUserRow = ({userId, user}: {userId: string, user: User}) => {
    const { data: serverData } = trpc.servers.getServerUserBooks.useQuery(userId)
    let totalPages = 0

   
   
  
    serverData?.forEach(book => totalPages += Number(book.pages))
   return( 
   <div data-pagecount={totalPages}  >
    <p>{user.name}</p>
    <p>{totalPages} pages read</p>
    {/* {serverData?.map((book) => {
      <p> {book.title}</p> 
    })} */}
    </div>)
}

export default ServerUserRow