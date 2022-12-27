import type { User } from "@prisma/client"
import { trpc } from "../utils/trpc"

const ServerUserRow = ({userId, user}: {userId: string, user: User}) => {
    // const { data: serverData } = trpc.servers.getServerUserBooks.useQuery(userId)
    // let totalPages = 0

   
   const { data: aggBooks } = trpc.servers.aggServerUserBooks.useQuery(userId)

   console.log(aggBooks?._sum.pages)
  
    // serverData?.forEach(book => totalPages += Number(book.pages))
   return( 
   <div data-pagecount={aggBooks?._sum.pages}  >
    <p>{user.name}</p>
    <p>{aggBooks?._sum.pages || 0} pages read</p>
    {/* {serverData?.map((book) => {
      <p> {book.title}</p> 
    })} */}
    </div>)
}

export default ServerUserRow