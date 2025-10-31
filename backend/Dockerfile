FROM node:20-alpine

# App root
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# Copy all source files
COPY . .

# Runtime env
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Start backend
CMD ["npm", "start"]
