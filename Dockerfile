FROM node:lts-alpine
WORKDIR /app

# Copy dependency files and install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev 2>/dev/null || npm install --omit=dev

# Copy application code
COPY . .

# App listens on 4000 by default (see index.js)
EXPOSE 4000
ENV NODE_ENV=production

CMD ["node", "index.js"]
