import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    authorization: {
      params: {
        scope: "openid email profile",},
    },
  }),],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const { email, name, image } = user; // Extract the image URL from the session user object
        const id = profile?.sub; // Use the Google profile ID as a unique identifier

        if (!id) {
          console.error("Google profile ID (sub) is undefined.");
          return false; // Deny sign-in if the profile ID is missing
        }

        // Check if a blogger already exists with the given Google ID
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, { id });

        if (!existingUser) {

          await writeClient.create({
            _type: "blogger",
            id,
            name,
            email,
            image,
            bio: profile.bio || "",
          });
        }

        return true; // Allow sign-in to proceed
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Deny sign-in on failure
      }
    },


    async jwt({ token, account, profile }) {
      try {
        if (account && profile) {
          const id = profile?.sub; // Use `sub` for unique Google user ID

          if (!id) {
            console.error("Google profile ID (sub) is undefined.");
            return token;
          }

          // Fetch blogger document
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, { id });

          if (user) {
            token.id = user._id; // Attach Sanity user ID to the token
          }
        }

        return token;
      } catch (error) {
        console.error("Error during JWT callback:", error);
        return token; // Return token even if an error occurs
      }
    },

    async session({ session, token }) {
      try {
        if (token?.id) {
          session.user.id = token.id; // Expose Sanity user ID in the session
        }

        return session;
      } catch (error) {
        console.error("Error during session callback:", error);
        return session; // Return session even if an error occurs
      }
    },
  },
  secret: process.env.AUTH_SECRET,

})