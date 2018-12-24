# Base Image setup
FROM node:8

# Create app directory
RUN mkdir -p /app

# Change workdir
WORKDIR /app

# Copy package.json to app directory
COPY package.json /app/package.json

# Install packages
RUN npm install

# Copy source to app directory
COPY . /app

# Export google authentication
ENV GOOGLE_APPLICATION_CREDENTIALS "/app/key.json"

# Run in port
EXPOSE 8000

# Command to start the app
CMD ["npm","start"]