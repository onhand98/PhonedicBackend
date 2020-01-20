import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteComment: async (_, args, { request, isUser, isAuthor }) => {
      try {
        const { commentId } = args;
        const {
          user: { id }
        } = request;
        if (isUser(request)) {
          const existComment = await prisma.$exists.comment({
            id: commentId,
            user: { id }
          });
          if (existComment) {
            await prisma.deleteComment({ id: commentId });
            return true;
          } else {
            throw Error("Comment doesn't exist");
          }
        } else if (isAuthor(request)) {
          const existComment = await prisma.$exists.comment({ id: commentId });
          if (existComment) {
            await prisma.deleteComment({ id: commentId });
            return true;
          } else {
            throw Error("Comment doesn't exist");
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
