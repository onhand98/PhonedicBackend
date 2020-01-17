import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    permission: ({ id }) => prisma.user({ id }).permission(),
    userName: ({ id }) => prisma.user({ id }).userName(),
    email: ({ id }) => prisma.user({ id }).email(),
    avatar: ({ id }) => prisma.user({ id }).avatar(),
    bio: ({ id }) => prisma.user({ id }).bio(),
    posts: ({ id }) => prisma.user({ id }).posts(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    isSelf: (parent, _, { request }) => {
      const {
        user: { id }
      } = request;
      const { id: parentId } = parent;
      return id === parentId;
    }
  }
};
