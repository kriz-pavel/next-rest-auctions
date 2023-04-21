import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { Auction, AuctionStatus } from '@prisma/client'
import { apiHandlerWrapper } from 'server/utils/apiHandlerWrapper'
import { AuctionService } from 'server/services/auction'
import { ErrorResponse } from 'server/utils/types'

const postSchema = z
  .object({
    title: z.string().max(50),
    status: z.enum([AuctionStatus.OPEN, AuctionStatus.CLOSED]),
    sellerId: z.number(),
  })

type PostResponseData = {
  data: Auction
}

type GetResponseData = {
  data: Auction[]
}

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostResponseData | GetResponseData | ErrorResponse>,
) => {
  if (req.method === 'POST') {
    const newAuction = await AuctionService.createAuction(req.body) 
    if (!newAuction) {
      res.status(500).json({ message: 'Could not create auction' })
      return
    }

    res.status(200).json({ data: newAuction })
    return
  }

  if (req.method === 'GET') {
    const auctions = await AuctionService.getAllAuctions()
    if (!auctions) {
      res.status(500).json({ message: 'Could not get auctions' })
      return
    }

    res.status(200).json({ data: auctions })
    return
  }

  res.status(405).json({ message: 'Method not allowed' })
}


export default apiHandlerWrapper({
  POST: {
    handler,
    schema: postSchema,
  },
  GET: {
    handler,
  },
})
