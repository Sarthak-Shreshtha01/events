
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { MANAGER_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn(
      { user: { name, email, image }, profile: { id, login, bio } }:
      { user: { name: string, email: string, image: string }, profile: { id: string, login: string, bio: string } }
    ) {
      const existingUser = await client.withConfig({ useCdn: false }).fetch(MANAGER_BY_GITHUB_ID_QUERY, {
        id
      });
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: id,
          name: name,
          username: login,
          email: email,
          image: image,
          bio: bio || "",
        })
      }
      if(existingUser) {
        return true
      }
    },
    
    async jwt({ token, account, profile }: { token: Record<string, any>; account?: Record<string, any>; profile?: { id: string } }) {
        if (account && profile) {
            const user = await client.withConfig({ useCdn: false }).fetch(MANAGER_BY_GITHUB_ID_QUERY, {
                id: profile.id
            })
            token.id = user?._id
        }
        return token;
    },
    
    async session({ session, token }: { session: Record<string, any>; token: Record<string, any> }) {
        Object.assign(session, { id: token.id });
        return session;
    }

  }
})