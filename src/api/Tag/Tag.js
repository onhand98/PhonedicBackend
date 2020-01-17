import { prisma } from "../../../generated/prisma-client";

export default {
  Tag: {
    name: ({ id }) => prisma.tag({ id }).name(),
    posts: ({ id }) => prisma.tag({ id }).posts()
  }
};
