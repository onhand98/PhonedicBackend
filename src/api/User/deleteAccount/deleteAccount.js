import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteAccount: async (_, args, { request, isUser, isAuthor }) => {
      try {
        const { userName } = args;

        if (isUser(request)) {
          const {
            user: { userName: meName }
          } = request;
          if (userName === meName) {
            await prisma.deleteUser({ userName });
            return true;
          }
        } else if (isAuthor(request)) {
          await prisma.deleteUser({ userName });
          return true;
        } else {
          throw Error("Sign First");
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
