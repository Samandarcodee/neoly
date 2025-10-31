FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json first
COPY package.json ./

# Verify package.json exists and has start script
RUN node -e "const pkg = require('./package.json'); console.log('Package name:', pkg.name); console.log('Start script:', pkg.scripts?.start); if (!pkg.scripts?.start) { throw new Error('Start script missing!'); }"

# Install dependencies
RUN npm install --omit=dev

# Copy all application files
COPY . .

# Verify package.json still exists after copy
RUN node -e "const pkg = require('./package.json'); console.log('Package name:', pkg.name); console.log('Start script:', pkg.scripts?.start); if (!pkg.scripts?.start) { throw new Error('Start script missing after copy!'); }"

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application directly (this will work regardless of package.json)
CMD ["node", "server.js"]
