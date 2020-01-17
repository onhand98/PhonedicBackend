import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMyProfile: async (_, __, { request, isAuthenticated }) => {
      try {
        isAuthenticated(request);
        const { user } = request;
        return await prisma.user({ id: user.id });
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
