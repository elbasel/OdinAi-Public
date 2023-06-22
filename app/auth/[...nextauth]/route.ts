import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";

// * Github
// TODO: change env variable names to be more consistent
const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;

// * Discord
const discordId = process.env.DISCORD_CLIENT_ID;
const discordSecret = process.env.DISCORD_CLIENT_SECRET;

// * Twitter
const twitterId = process.env.TWITTER_CLIENT_ID;
const twitterSecret = process.env.TWITTER_CLIENT_SECRET;

// * Google
const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!githubId || !githubSecret)
  throw new Error("Missing GITHUB_ID or GITHUB_SECRET");

if (!discordId || !discordSecret)
  throw new Error("Missing DISCORD_ID or DISCORD_SECRET");

if (!twitterId || !twitterSecret)
  throw new Error("Missing TWITTER_ID or TWITTER_SECRET");

if (!googleId || !googleSecret)
  throw new Error("Missing GOOGLE_ID or GOOGLE_SECRET");

const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  //   verifyRequest: "/auth/verify-request",
  //   newUser: "/auth/new-user",
  // },
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
    }),
    DiscordProvider({
      clientId: discordId,
      clientSecret: discordSecret,
    }),
    TwitterProvider({
      clientId: twitterId,
      clientSecret: twitterSecret,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
