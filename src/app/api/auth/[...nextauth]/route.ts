import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // untuk cek password

const prisma = new PrismaClient();

const handler = NextAuth({
  debug: true, // Tambah ini

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔐 Login attempt:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) {
          console.log("❌ Admin not found");
          return null;
        }

        const isValidPassword = await bcrypt.compare(credentials.password, admin.password);

        if (!isValidPassword) {
          console.log("❌ Invalid password");
          return null;
        }

        console.log("✅ Login success:", admin.email);

        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // <-- 2 jam (dalam detik)
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
