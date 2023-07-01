# Tutorial-Breadit

From course: https://www.youtube.com/watch?v=mSUKMfmLAt0

29.06: 21:51
30.06: 59:17, 1:04:11, 1:40:24, 1:54:17
01.07: 2:19:39, 2:37:24, 2:50:25, 3:15:35

# Tech stack:

- Next.js
- TypeScript
- Tailwind CSS
- Prisma + PlanetScale
- NextAuth + Google OAuth

Repo updated with:

- npm-check
- npm-check-updates
- npm outdated

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

6. Prisma add Posts (SHIFT+ALT+F for auto complete)

7. npx shadcn-ui@latest add input
