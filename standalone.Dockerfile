FROM node:21-slim as BASE

WORKDIR /app

COPY ./standalone /app/standalone

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

WORKDIR /app/standalone

EXPOSE 80

# load local env variables
ENV NODE_ENV .env.local

ENV PORT 80
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]