import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addTag: async (_, args) => {
      try {
        const { name, postId } = args;
        let exists = await prisma.$exists.tag({ name });
        if (!exists) {
          await prisma.createTag({ name, posts: { connect: { id: postId } } });
          return true;
        } else {
          exists = await prisma.tag({ name });
          await prisma.updatePost({
            where: { id: postId },
            data: { tag: { connect: { id: exists.id } } }
          });
          return true;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
};
