import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

console.log('clientId:', process.env.GOOGLE_ID, 'clientSecret:', process.env.GOOGLE_SECRET);

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
})