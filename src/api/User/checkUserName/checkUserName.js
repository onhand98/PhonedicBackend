import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    checkUserName: async (_, args) => {
      try {
        const { userName } = args;
        const exists = await prisma.$exists.user({ userName });
        if (exists) {
          return true;
        } else {
          throw Error("This account doesn't exists, Sign Up First");
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
