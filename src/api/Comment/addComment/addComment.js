import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: async (_, args, { request, isUser }) => {
      try {
        if (isUser(request)) {
          const { text, postId } = args;
          const {
            user: { id }
          } = request;
          return await prisma.createComment({
            user: { connect: { id } },
            post: {
              connect: { id: postId }
            },
            text
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
