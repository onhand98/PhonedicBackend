import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    signIn: async (_, args) => {
      try {
        const { loginSecret, email } = args;
        const user = await prisma.user({ email });
        if (user.loginSecret === loginSecret) {
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              loginSecret: ""
            }
          });
          return generateToken(user.id);
        } else {
          throw Error("Wrong Login Secret");
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
