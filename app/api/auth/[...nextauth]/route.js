import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/db/connectDB";
import User from "@/models/User.model";

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectDB();
      const isUserExists = await User.findOne({ email: user.email }).lean();

      if (!isUserExists) {
        const newUser = new User({
          email: user.email,
          name: user.name,
          username: user.email.split("@")[0],
          avatar: user.image,
          cover: user.image,
        });

        await newUser.save();
      }

      return true;
    },
    async session({ session, token, user }) {
      const client = await User.findOne({ email: session.user.email }).lean();
      session.user.name = client.username;

      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };
