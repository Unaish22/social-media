import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import InstagramProvider from "next-auth/providers/instagram";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID ?? "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? "",
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID ?? "",
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (account) {
        console.log(
          `User signed in: ${user.id} via ${account.provider}${
            isNewUser ? " (new user)" : ""
          }`
        );
      } else {
        console.log(`User signed in: ${user.id} with no account info`);
      }

      if (profile) {
        console.log("Profile info:", profile);
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
