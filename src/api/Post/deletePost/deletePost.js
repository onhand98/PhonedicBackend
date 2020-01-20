import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deletePost: async (_, args, { request, isUser, isAuthor }) => {
      try {
        const {
          user: { id }
        } = request;
        const { postId } = args;
        if (isUser(request)) {
          const existPost = await prisma.$exists.post({
            id: postId,
            user: { id }
          });
          if (existPost) {
            await prisma.deletePost({ id: postId });
            return true;
          } else {
            throw Error("Post doesn't exist");
          }
        } else if (isAuthor(request)) {
          const existPost = await prisma.$exists.post({ id: postId });
          if (existPost) {
            await prisma.deletePost({ id: postId });
            return true;
          } else {
            throw Error("Post doesn't exist");
          }
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
