# Property Hub

## Tagline

**Organize, Track, and Manage Your Property with Ease.**

## Overview

Property Hub is a centralized platform for managing real estate properties, client interactions, and agent activities. It provides role-based access control to ensure efficient management and security.

## Features

- **Authentication:** Google authentication with admin approval for new users.
- **Role-Based Access:**
  - **Admin:** Manage properties, clients, agents, and application settings.
  - **Agent:** Manage only the properties they have added.
  - **Client:** View and print properties shared by an agent or admin (if access is granted).
- **Advanced Property Search:** Filter properties by location, type, price, and more.
- **Property Details Management:** Includes title, location, measurement, type, address, price, and WYSIWYG description editor.
- **Media Uploads:** Support for high-quality images and videos.
- **Audit Tracking:** Logs interactions with properties and clients.
- **Print Feature:** Generate and print property details if access is granted.
- **PWA Support:** Access the platform as a Progressive Web App (PWA).

## Pages

1. **Login/Registration Page** – Google Authentication only; new users must wait for admin approval.
2. **Admin Page** – Manage properties, clients, agents, and application settings.
3. **Agent Page** – Manage only the properties they have added.
4. **Client Page** – View properties shared by an agent or admin; print if access is granted.
5. **Property Search Page** – Advanced search with filters and sorting.
6. **Profile Management Page** – Update user details and preferences.
7. **Print Property Page** – Print or download property details if access is granted.
8. **Unauthorized Access Page** – Displayed when a user tries to access restricted content.

## Technology Stack

- **Frontend:** React.js, React Router, MUI, Tailwind CSS, Vite.js.
- **Backend:** Node.js, Express.js, MySQL.
- **Authentication:** Google Authentication.
- **Container Support:** Docker (if required in deployment).

## Setup Instructions

### Prerequisites

- Node.js & npm
- MySQL database

### Installation

```sh
# Clone the repository
git clone https://github.com/your-repo/property-hub.git
cd property-hub

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Backend Setup

```sh
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start backend server
npm start
```

### Database Setup

- Configure MySQL database and update environment variables in `.env` file.

## Contribution

Feel free to submit pull requests and raise issues to improve the platform.

## License

This project is licensed under the MIT License.
