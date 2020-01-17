import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    signUp: async (_, args) => {
      try {
        const { userName, email, permission } = args;
        const exsits = await prisma.$exists.user({
          OR: [{ userName }, { email }]
        });
        if (exsits) {
          throw Error("This username / email is already taken");
        }
        if (permission === "USER") {
          await prisma.createUser({
            userName,
            email,
            permission: "USER"
          });
          return true;
        } else {
          await prisma.createUser({
            userName,
            email,
            permission: "AUTHOR"
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
