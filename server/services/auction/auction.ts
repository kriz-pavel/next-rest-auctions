import { Prisma, Auction } from '@prisma/client';
import { prisma } from "../../prisma";

export type AuctionInputModel = Pick<Auction, 'title' | 'status' | 'sellerId'>;

export const _createAuction = (prismaClient: typeof prisma) => async (Auction: AuctionInputModel) => {
  try {
    const newAuction = await prismaClient.auction.create({
      data: Auction
    });

    return newAuction;
  } catch (error) {
    console.log(error);
    // sentry.captureException(error);
  }
};

export const _getAllAuctions = (prismaClient: typeof prisma) => async () => {
  try {
    const auctions = await prismaClient.auction.findMany();

    return auctions;
  } catch (error) {
    console.log(error);
    // sentry.captureException(error);
  }
};

export const AuctionService = {
  createAuction: _createAuction(prisma),
  getAllAuctions: _getAllAuctions(prisma),
  test: () => {  }
}
