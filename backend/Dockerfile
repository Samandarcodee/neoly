FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy all application files
COPY . .

# Verify package.json has start script
RUN node -e "const pkg = require('./package.json'); if (!pkg.scripts || !pkg.scripts.start) { console.error('ERROR: start script missing'); process.exit(1); }"

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
