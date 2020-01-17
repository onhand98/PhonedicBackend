import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editProfile: async (_, args, { request, isAuthenticated }) => {
      try {
        const { avatar, bio } = args;
        isAuthenticated(request);
        const {
          user: { id }
        } = request;
        return await prisma.updateUser({
          data: { avatar, bio },
          where: { id }
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
