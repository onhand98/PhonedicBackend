import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMyProfile: async (_, __, { request, isAuthenticated }) => {
      try {
        if (isAuthenticated(request)) {
          const { user } = request;
          return await prisma.user({ id: user.id });
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
