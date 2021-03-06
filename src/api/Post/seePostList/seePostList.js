import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePostList: async (_, args) => {
      try {
        const { skipNumber } = args;
        return await prisma.posts({
          first: 4, // post 갯수
          skip: skipNumber, // skip 몇번하는지
          where: { category: "POST" },
          orderBy: "createdAt_DESC"
        });
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
};
