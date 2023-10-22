# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port 3000 (or the port your React app runs on)
EXPOSE 3000

# Command to start your React app
CMD ["npm", "start"]