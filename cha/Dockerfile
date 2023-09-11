# Use Node.js v17 as the base image
FROM node:17

# Set the working directory
WORKDIR /app/frontend

# Install Yarn

# Copy package.json, package-lock.json, and yarn.lock before other files
COPY package.json package-lock.json ./

# Copy all files
RUN npm install

COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "run", "dev"]
