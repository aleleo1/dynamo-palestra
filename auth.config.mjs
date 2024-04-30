import { defineConfig } from 'auth-astro';

import Credentials from '@auth/core/providers/credentials';
import { loadEnv } from "vite";
import { ZodError } from "zod"

import { object, string } from "zod"
const { AUTH_SECRET } = loadEnv(process.env.AUTH_SECRET, process.cwd());
export default defineConfig({
  secret: AUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        user: { label: "user", type: "email", placeholder: "[email protected]" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        try {
          /*           let user = null
          
                    console.log(credentials)
                    const signInSchema = object({
                      user: string({ required_error: "Email is required" })
                        .min(1, "Email is required")
                        .email("Invalid email"),
                      password: string({ required_error: "Password is required" })
                        .min(1, "Password is required")
                        .min(8, "Password must be more than 8 characters")
                        .max(32, "Password must be less than 32 characters"),
                    }) */
          console.log('//////////', request)
          /* 
                    const { email, password } = await signInSchema.parseAsync((new URL(request.url)).searchParams)
                    console.log('//////////', email, password) */

          /*  // logic to salt and hash password
           const pwHash = saltAndHashPassword(password)
  
           // logic to verify if user exists
           user = await getUserFromDb(email, pwHash)
  
           if (!user) {
             throw new Error("User not found.")
           } */

          // return json object with the user data
          return "done"
        } catch (error) {
          console.log(error)
          return null

        }
      }
    })
  ],
});