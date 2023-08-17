# Use the official Node.js LTS image as the base image
FROM node:19

# Install build-essential for native dependencies
RUN apt-get update && \
    apt-get install -y build-essential && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your application runs on
EXPOSE 3000

# Command to start your application
CMD ["node", "dist/index.js"]
