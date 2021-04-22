# Karst

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
