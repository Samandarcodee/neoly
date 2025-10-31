FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json first
COPY package.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy all application files (excluding .dockerignore patterns)
COPY . .

# List all files to debug
RUN echo "=== Files in /app ===" && ls -la

# Verify server.js exists
RUN if [ ! -f "server.js" ]; then echo "ERROR: server.js not found!" && exit 1; fi

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
