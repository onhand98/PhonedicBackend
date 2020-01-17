import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUserProfile: async (_, args) => {
      try {
        const { userName } = args;
        const exists = await prisma.user({ userName });
        if (exists) {
          return exists;
        } else {
          throw Error("Doesn't exist user");
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
