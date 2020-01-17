import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    checkEmail: async (_, args) => {
      try {
        const { email } = args;
        const exists = await prisma.$exists.user({ email });
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
