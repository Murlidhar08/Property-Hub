# Property Hub Backend

## Overview
This is the backend service for **Property Hub**, built using **Node.js**, **Express.js**, and **MySQL**. It provides RESTful APIs for managing properties, clients, agents, and requirements.

## Technologies Used
- **Node.js** (Runtime)
- **Express.js** (Web framework)
- **MySQL** (Database)
- **Sequelize.js** (ORM, optional)
- **JWT Authentication** (Secure API access)
- **Winston Logger** (Logging mechanism)
- **Docker** (Containerization)

## Folder Structure
```
Backend
│   .env
│   .env_sample
│   app.js
│   Dockerfile
│   package-lock.json
│   package.json
│   readme.md
│
├───bin
│       www
│
├───config
│       commonFunction.js
│       encryptionUtil.js
│       logger.js
│       mySql.js
│
├───controller
│       agentController.js
│       auditController.js
│       authController.js
│       clientController.js
│       mySqlController.js
│       propertyController.js
│       requirementsController.js
│       userController.js
│
├───routes
│       agentRoutes.js
│       auditRoutes.js
│       authRoutes.js
│       clientRoutes.js
│       propertyRoutes.js
│       requirementRoutes.js
│       serverRoute.js
│       userRoutes.js
│
└───validators
        agentValidator.js
        clientValidator.js
        propertyValidator.js
```

## Installation & Setup

### Prerequisites
- **Node.js** (v16+ recommended)
- **MySQL** installed and running
- **Docker** (Optional, for containerization)

### Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/property-hub-backend.git
   cd property-hub-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Rename `.env_sample` to `.env`
   - Update database credentials and other settings in `.env`
   
4. **Run Database Migrations (if using Sequelize)**
   ```bash
   npm run migrate
   ```

5. **Start the Server:**
   ```bash
   npm start
   ```
   Or, for development with **nodemon**:
   ```bash
   npm run dev
   ```

6. **API will be available at:**
   ```
   http://localhost:3000
   ```

## API Endpoints
| Resource     | Method | Endpoint               | Description              |
|-------------|--------|-----------------------|--------------------------|
| **Auth**    | POST   | `/auth/login`         | User login               |
| **Auth**    | POST   | `/auth/register`      | User registration        |
| **Agents**  | GET    | `/agents`             | Get all agents           |
| **Agents**  | POST   | `/agents`             | Add a new agent          |
| **Clients** | GET    | `/clients`            | Get all clients          |
| **Clients** | POST   | `/clients`            | Add a new client         |
| **Properties** | GET  | `/properties`        | Get all properties       |
| **Requirements** | GET | `/requirements`      | Get all requirements     |

## Docker Setup
To run the backend using Docker:
```bash
docker build -t property-hub-backend .
docker run -p 3000:3000 --env-file .env property-hub-backend
```

## Logging
- Logs are handled using **Winston Logger** (`config/logger.js`)
- Logs are stored in `logs/` directory
- Change log levels in `.env` (default: `info`)

## Contributing
1. Fork the repo
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a pull request

## License
This project is licensed under the **MIT License**.

