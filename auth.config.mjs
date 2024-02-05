import GoogleProvider from '@auth/core/providers/google'

import { defineConfig } from 'auth-astro'

export default defineConfig({
    providers: [
        GoogleProvider({
          clientId: import.meta.env.GOOGLE_ID,
          clientSecret: import.meta.env.GOOGLE_SECRET,
          
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"

            }
          }
        })
      ],
})