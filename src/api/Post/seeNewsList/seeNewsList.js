import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeNewsList: async (_, args) => {
      try {
        const { skipNumber } = args;
        return await prisma.posts({
          first: 4, // post 갯수
          skip: skipNumber, // skip 몇번하는지
          where: { category: "NEWS" },
          orderBy: "createdAt_DESC"
        });
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
};
