import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePost: async (_, args) => {
      try {
        const { id } = args;
        return await prisma.post({ id });
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
