import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    category: ({ id }) => prisma.post({ id }).category(),
    title: ({ id }) => prisma.post({ id }).title(),
    mainImage: ({ id }) => prisma.post({ id }).mainImage(),
    user: ({ id }) => prisma.post({ id }).user(),
    content: ({ id }) => prisma.post({ id }).content(),
    tag: ({ id }) => prisma.post({ id }).tag(),
    comments: ({ id }) => prisma.post({ id }).comments()
  }
};
