import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteAccount: async (_, args, { request, isAuthenticated }) => {
      try {
        const { userName } = args;
        isAuthenticated(request);
        const {
          user: { userName: meName, permission }
        } = request;
        console.log(userName, meName, permission);
        if (userName === meName) {
          await prisma.deleteUser({ userName });
          return true;
        } else if (permission === "AUTHOR") {
          console.log("IM here");
          await prisma.deleteUser({ userName });
          return true;
        } else {
          throw Error("You can't delete account");
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
