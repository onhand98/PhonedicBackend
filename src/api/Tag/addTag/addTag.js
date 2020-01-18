import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addTag: async (_, args, { request, isAuthor }) => {
      try {
        if (isAuthor(request)) {
          const { name, postId } = args;
          let exists = await prisma.$exists.tag({ name });
          if (!exists) {
            await prisma.createTag({
              name,
              posts: { connect: { id: postId } }
            });
            return true;
          } else {
            exists = await prisma.tag({ name });
            await prisma.updatePost({
              where: { id: postId },
              data: { tag: { connect: { id: exists.id } } }
            });
            return true;
          }
        } else {
          throw Error("Wrong Access");
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
};
