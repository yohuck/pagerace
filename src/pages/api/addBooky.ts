import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const addBooky = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST" || req.method === undefined || req.method === "GET"){
    console.log(req.body)
    const data = JSON.parse(req.body)
    console.log(data)
    const book = await prisma.book.create({
    data: {
        author: data.author,
        title: data.title,
        pages: data.pages,
        userId: data.userId
    }
  })

  res.status(200).json(book);
  } else if (req.method === "DELETE"){
    const data = JSON.parse(req.body)
    console.log(data)
    const deleteBook = await prisma.book.delete({
      where: {id: data.bookId}
    })
    res.status(200).json(deleteBook)
  }
   
};

export default addBooky;
