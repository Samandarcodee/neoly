FROM node:20-alpine

# App root
WORKDIR /app

# Copy backend package files and install only backend deps
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci --omit=dev || npm install --omit=dev

# Copy backend source only
COPY backend/. /app/backend

# Runtime env
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Start backend
CMD ["npm", "start"]

