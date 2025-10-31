FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json first
COPY package.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy all application files
COPY . .

# Show package.json content for debugging
RUN cat package.json

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application directly (more reliable than npm start)
CMD ["node", "server.js"]
