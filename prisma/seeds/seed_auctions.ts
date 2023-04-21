import { PrismaClient, Auction } from '@prisma/client';
import { user1, user2, user3 } from './seed_users';

export type AuctionRequiredFileds = Omit<
  Auction,
  'createdAt' | 'updatedAt' | 'highestBidAmount' | 'highestBidderId'
>;

const auctions: AuctionRequiredFileds[] = [
  {
    id: 1,
    title: 'Auction1',
    status: 'OPEN',
    sellerId: user1.id,
  },
  {
    id: 2,
    title: 'Auction2',
    status: 'OPEN',
    sellerId: user2.id,
  },
  {
    id: 3,
    title: 'Auction3',
    status: 'OPEN',
    sellerId: user1.id,
  },
  {
    id: 4,
    title: 'Auction4',
    status: 'CLOSED',
    sellerId: user3.id,
  },
];

export const seedAuctions = async (prisma: PrismaClient) => {
  await prisma.auction.createMany({
    data: auctions,
    skipDuplicates: true,
  });
};
