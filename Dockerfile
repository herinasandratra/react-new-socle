# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


# Install project dependencies
RUN npm install

# Install react-scripts globally
RUN npm install -g react-scripts

# Copy the entire project to the working directory
COPY . .

# Build the React app
# RUN npm run build

# Expose a port (if your React app uses a specific port)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
