# Tutorial-Breadit

From course: https://www.youtube.com/watch?v=mSUKMfmLAt0

29.06: 21:51
30.06: 59:17, 1:04:11, 1:40:24

# Tech stack:

- Next.js
- TypeScript
- Tailwind CSS
- Prisma + PlanetScale
- NextAuth + Google OAuth

# Instalation:

1. npm install

# Process:

1. npx shadcn-ui@latest init (+npx shadcn-ui@latest add toast)
2. Google Cloud Console secrets to .env:
   https://console.cloud.google.com/

- new project
- oauth client id:
  https://console.cloud.google.com/apis/credentials/oauthclient
- Web Application
- Javascript origin: http://localhost:3000 (for local development)
- Redirect URI: http://localhost:3000/api/auth/callback/google
  6b. Copy secret to .env.local

3. Prepare prisma db:
   https://app.planetscale.com/
   effect: DATABASE_URL in .env

4. after prisma change lets push:
   npx prisma db push
   npx prisma generate

5. npx shadcn-ui@latest add dropdown-menu
   npx shadcn-ui@latest add avatar
