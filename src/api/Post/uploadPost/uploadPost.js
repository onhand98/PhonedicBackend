import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadPost: async (_, args, { request, isUser, isAuthor }) => {
      try {
        const {
          user: { id }
        } = request;
        const { category, title, mainImage, content, images } = args;
        if (isUser(request) && (category === "POST" || category === "QNA")) {
          const post = await prisma.createPost({
            category,
            title,
            mainImage,
            content,
            user: { connect: { id } }
          });
          images.forEach(
            async image =>
              await prisma.createImage({
                url: image,
                post: {
                  connect: {
                    id: post.id
                  }
                }
              })
          );
        } else if (
          isAuthor(request) &&
          (category === "NEWS" ||
            category === "REVIEWS" ||
            category === "PHONES")
        ) {
          const post = await prisma.createPost({
            category,
            title,
            mainImage,
            content,
            user: { connect: { id } }
          });
          images.forEach(async image => {
            await prisma.createImage({
              url: image,
              post: {
                connect: {
                  id: post.id
                }
              }
            });
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
