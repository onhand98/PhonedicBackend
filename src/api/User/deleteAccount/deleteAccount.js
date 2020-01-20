import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteAccount: async (_, args, { request, isUser, isAuthor }) => {
      try {
        const { userId } = args;
        const {
          user: { id }
        } = request;
        if (isUser(request)) {
          if (userId === id) {
            const existUser = await prisma.$exists.user({ id });
            if (existUser) {
              await prisma.deleteUser({ id });
              return true;
            } else {
              throw Error("User doesn't exist");
            }
          } else {
            throw Error("Wrong Access");
          }
        } else if (isAuthor(request)) {
          const existUser = await prisma.$exists.user({ id: userId });
          if (existUser) {
            await prisma.deleteUser({ id: userId });
            return true;
          } else {
            throw Error("User doesn't exist");
          }
        } else {
          throw Error("Sign In First");
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
