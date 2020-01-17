import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadPost: async (_, args, { request, isAuthenticated }) => {
      try {
        isAuthenticated(request);
        const {
          user: { id, permission }
        } = request;
        const { category, title, mainImage, content } = args;
        if (
          (permission === "USER" && category === "POST") ||
          category === "QNA"
        ) {
          return await prisma.createPost({
            category,
            title,
            mainImage,
            content,
            user: { connect: { id } }
          });
        } else if (
          (permission === "AUTHOR" && category === "NEWS") ||
          category === "REVIEWS" ||
          category === "PHONES"
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
