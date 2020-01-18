import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, args, { request, isAuthor }) => {
      try {
        if (isAuthor(request)) {
          const { term } = args;
          return await prisma.users({
            where: { OR: [{ userName_contains: term }] }
          });
        } else {
          throw Error("Wrong Access");
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
};
