# Scheine App

This project is a system for generating various types of 'Scheine' used in German medical practices. It consists of two main parts: the `client` (frontend) and the `server` (backend). Both are set up to run with Docker and share the same Node.js environment.

![Screenshot 2024-09-18 at 16 36 25](https://github.com/user-attachments/assets/4cd83ca3-eaa6-48cf-8e61-f892d4610048)


## Requirements

- [Docker](https://www.docker.com/) installed on your machine.
- [Node.js](https://nodejs.org/en) version `22.3.0` (same for both client and server).
- [pnpm](https://pnpm.io/) as the package manager.

## Getting Started

### Running the App

1. Clone this repository.
2. Navigate to the root directory of the project.
3. Run the following command to start both the client and the server via Docker:

   ```bash
   docker-compose up
    ```
This command will spin up both the client and server services.

## Development
The app is divided into two sub-projects:

Client: Frontend part of the application.
Server: Backend part of the application.
Both parts of the application use Node.js version 22.3.0 and are managed using pnpm.

## Database Migrations
To apply database migrations for the backend, follow these steps:

Navigate to the server directory:
```
cd server
```
Run the following command to apply the migrations:
```
pnpm run migration:run
```

Useful Commands
Build the application:
```
docker-compose build
```

Stop the application:
```
docker-compose down
```

## Project Structure
client/: Contains the frontend code.
server/: Contains the backend code and database migrations.
Package Manager
This project uses pnpm as the package manager. Make sure to have pnpm installed globally if you are working locally.

You can install pnpm globally with the following command:
```
npm install -g pnpm
```

## Node Version
Ensure you are using Node.js version 22.3.0 to avoid any compatibility issues. If you use nvm, you can install the correct version with:

```
nvm install 22.3.0
nvm use 22.3.0
```

License
-
