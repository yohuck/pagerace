import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const addBooky = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body)
    const data = JSON.parse(req.body)
    console.log(data)
  const users = await prisma.book.create({
    data: {
        author: data.author,
        title: data.title,
        pages: data.pages,
        userId: data.userId
    }
  }
  )

  res.status(200).json(users);
};

export default addBooky;
