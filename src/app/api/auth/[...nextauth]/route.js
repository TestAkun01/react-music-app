import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectToDatabase } from "@/service/db";
import User from "@/service/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDatabase();
      let existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        existingUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,
          role: "user",
        });
        await existingUser.save();
      } else {
        user.role = existingUser.role;
      }
      user.id = existingUser._id;
      return true;
    },
    async session({ session, token }) {
      session.userId = token.userId;
      session.userRole = token.userRole;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.userRole = user.role;
      } else {
        await connectToDatabase();

        const existingUser = await User.findById(token.userId);

        if (existingUser) {
          token.userRole = existingUser.role;
        }
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
