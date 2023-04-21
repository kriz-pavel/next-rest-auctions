import { PrismaClient, User } from '@prisma/client';

export type UserRequiredFileds = Omit<User, 'createdAt'>;

export const user1: UserRequiredFileds = {
  id: 1,
  email: 'test1@email.com',
};

export const user2: UserRequiredFileds = {
  id: 2,
  email: 'test2@email.com',
};

export const user3: UserRequiredFileds = {
  id: 3,
  email: 'test3@email.com',
};

export const seedUsers = async (prisma: PrismaClient) => {
  await prisma.user.createMany({
    data: [user1, user2, user3],
    skipDuplicates: true,
  });
};
