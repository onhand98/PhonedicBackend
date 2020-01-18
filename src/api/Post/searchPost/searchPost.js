import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      try {
        const { term } = args;
        return await prisma.posts({
          where: { OR: [{ title_starts_with: term }, { title_contains: term }] }
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
