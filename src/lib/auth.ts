import { NextAuthOptions } from 'next-auth'
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import BattleNetProvider from "next-auth/providers/battlenet";
import { stupidFix } from './stupidFix';


export const authOptions: NextAuthOptions = {
    adapter: SupabaseAdapter({
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
        secret: `${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    }),
    pages: {
        signIn: '/login',
    },
    debug: true,
    providers: [
        BattleNetProvider({
            clientId: `${process.env.BATTLENET_CLIENT_ID}`,
            clientSecret: `${process.env.BATTLENET_CLIENT_SECRET}`,
            issuer: "https://eu.battle.net/oauth", // figure out best way to change this on the fly incase of region change
        })
    ],
    callbacks: {
        async session({ session, user }) {
            if (session) {

                //heres the stupid extra call i reffed in stupidFix.ts
                let sf = await stupidFix(user.id)
                if (sf) {
                    session.user.id = sf.id
                    session.user.name = sf.name
                }

            }
            return session
        },
        redirect() {
            return '/dashboard'
        },

    },
}

