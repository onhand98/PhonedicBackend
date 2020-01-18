import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadPost: async (_, args, { request, isUser, isAuthor }) => {
      try {
        const {
          user: { id }
        } = request;
        const { category, title, mainImage, content } = args;
        if (isUser(request) && (category === "POST" || category === "QNA")) {
          return await prisma.createPost({
            category,
            title,
            mainImage,
            content,
            user: { connect: { id } }
          });
        } else if (
          isAuthor(request) &&
          (category === "NEWS" ||
            category === "REVIEWS" ||
            category === "PHONES")
        ) {
          return await prisma.createPost({
            category,
            title,
            mainImage,
            content,
            user: { connect: { id } }
          });
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
