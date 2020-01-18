import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editProfile: async (_, args, { request, isAuthenticated }) => {
      try {
        const { avatar, bio } = args;
        const isSignIn = isAuthenticated(request);
        if (isSignIn) {
          const {
            user: { id }
          } = request;
          return await prisma.updateUser({
            data: { avatar, bio },
            where: { id }
          });
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
