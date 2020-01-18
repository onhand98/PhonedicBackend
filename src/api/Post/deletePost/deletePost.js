import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deletePost: async (_, args, { request, isUser, isAuthor }) => {
      try {
        const {
          user: { id }
        } = request;
        const { id: postId } = args;
        if (isUser(request)) {
          const post = await prisma.$exists.post({ id: postId, user: { id } });
          if (post) {
            await prisma.deletePost({ id: postId });
            return true;
          } else {
            throw Error("Wrong Access");
          }
        } else if (isAuthor(request)) {
          await prisma.deletePost({ id: postId });
          return true;
        } else {
          throw Error("Sign In First");
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
};
