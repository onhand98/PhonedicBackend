import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteTag: async (_, args, { request, isAuthor }) => {
      try {
        const { tagId } = args;
        if (isAuthor(request)) {
          const existTag = await prisma.$exists.tag({ id: tagId });
          if (existTag) {
            await prisma.deleteTag({ id: tagId });
            return true;
          } else {
            throw Error("Tag doesn't exist");
          }
        } else {
          throw Error("Wrong Access");
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
