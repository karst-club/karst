# Karst

Copyright © 2021 Caz Downing-Bryant and The Karst Archipelago Historical Society

Source code and rules mechanics are free to use.

All text and images as well as the Karst setting are copyright of the Karst Archipelago Historical Society.

## 3rd-Party Content Creation License

You—any individual or entity—may publish your own stories, adventures, supplements, tools, and any other content for use with the Karst setting. This license is subject to the following conditions:

1. You are free to reference and expand upon the Karst setting in your publications.
2. You may not represent your publication as being approved by the Karst Archipelago Historical Society in any way, shape, or form.
   - If your publication references the Karst setting, you must make reference to the above in your legal text and on any websites where you sell or give away your work by stating something to the effect of: “This is an independent publication by YOUR NAME and is not affiliated with the Karst Archipelago Historical Society. Karst is a trademark of the Karst Archipelago Historical Society and is used with permission, under license."
3. You are legally responsible for your works; the Karst Archipelago Historical Society claims no liability for your use of the Karst setting and/or rules.
4. The Karst Archipelago Historical Society retains the right to deny the use of this license at any time—don’t use Karst to push a bigoted ideology.

All other rights reserved.

## Development Setup

1. Create a `.env` file with the right contents. (Ask Caz for secret values)

```
DATABASE_URL="postgresql://test-user:test-password@localhost:5432/karst-db?schema=public"
DISCORD_CLIENT_ID={{SECRET}}
DISCORD_CLIENT_SECRET={{SECRET}}
NEXTAUTH_URL=http://localhost:3000/api/auth
```

2. Start Docker

3. Run setup scripts

```
npm install && docker-compose up -d && npm run setup
```

4. Run Next

```
npm run dev
```

## Database Migrations

The current practice is to do these locally with adult supervision.

https://www.prisma.io/docs/concepts/components/prisma-migrate
