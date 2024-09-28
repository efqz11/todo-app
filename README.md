# To-Do List Application

This is a full-stack to-do list application built using **Next.js**, **TypeScript**, **Tailwind CSS**, **Zustand** for state management, **Prisma** for database management, and **NextAuth** for authentication. The project is structured following the **Feature-Sliced Design (FSD)** pattern for better scalability and maintainability.

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)

## Overview

This to-do list app allows users to register, log in, and manage their tasks. Each task can be marked as completed, and users can delete tasks as needed. The application features authentication and protected routes, ensuring that each user can only access their own tasks.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js**: Version 16 or above.
- **MySQL**: Any version (or you can set it up using Docker).
- **Docker**: Optional, for setting up a MySQL instance in a container.
- **npm**: Node.js package manager (comes with Node.js).

### Installation

1. **Clone the repository**:

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/efqz11/todo-app.git
   ```

2. **Change to the project directory**:

   ```bash
   cd todo-app
   ```

3. **Install dependencies**:

   Install the required npm packages by running:

   ```bash
   npm install
   ```

4. **Set up environment variables**:

   Set up environment variables:
    Create a .env file in the root of the project and add the following environment variables:

   ```bash
    DATABASE_URL="mysql://user:password@localhost:3306/todo_db"
    NEXTAUTH_SECRET="your_secret"
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your-secret-key"
    JWT_SECRET="your_jwt_secret_here"
   ```
   Replace `user` and `password` with your MySQL credentials, and `todo_db` with the database name of your choice.


5. **Run database migrations**:

    Set up the database schema using Prisma by running:

   ```bash
   npx prisma migrate dev
   ```
   This will apply the migrations and set up your database tables.

6. **Run the development server**:

    After setting up the database, run the application locally:

   ```bash
   npm run dev
   ```

6. **Open the application**:

    Navigate to [http://localhost:3000](http://localhost:3000) in your browser. You should now be able to see the application running.

### Additional Notes

Running MySQL with Docker: If you don't have MySQL installed locally, you can use Docker to set it up quickly:

   ```bash
   docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=todo_db -p 3306:3306 -d mysql:latest
   ```
Ensure that your `.env` file points to this database with the correct credentials.

## Features
- **User Authentication**: Users can register and log in using credentials.
- **State Management**: Zustand is used for managing application state.
- **Feature-Sliced Design (FSD)**: [FSD](https://feature-sliced.design) is used for better code organization and scalability.
- **Responsive UI**: Tailwind CSS is used for styling to ensure responsiveness.
- **API Integration**: Custom APIs for managing to-do items.
- **Database**: Prisma ORM is used for managing a MySQL database.
- **Real-time updates**: Tasks are updated dynamically after actions such as adding, completing, or deleting a task.
- **External API Integration**: Fetching random quotes from an external API for fun!

## Technologies Used
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (State Management)
- **Prisma** (ORM with MySQL)
- **NextAuth** (User Authentication)
- **React Icons** (UI Icons)

## Architecture

This project follows the **Feature-Sliced Design (FSD)** pattern. FSD organizes the application into clear feature boundaries, making the app modular and scalable. The main ideas behind FSD are:

1. **Separation by Features**: Each feature has its own folder containing everything related to that feature (e.g., components, hooks, services).
2. **Layered Structure**: The app is divided into multiple layers: `pages`, `features`, `shared`, and `entities`. Each layer has a specific responsibility.
3. **Component Isolation**: Components are isolated by feature to promote reusability and maintainability.

### Layers in FSD
- **`pages/`**: This folder contains the top-level routing pages of the application.
- **`features/`**: Contains feature-specific components, logic, and services. For example, `auth`, `todos`, etc.
- **`shared/`**: Contains reusable components and utilities that are shared across multiple features.
- **`entities/`**: Contains the core domain logic, including Prisma models and business rules.

## Folder Structure

```bash
├── features/          # Feature-specific folders
│   ├── auth/          # Authentication logic (login, registration)
│   └── todos/         # To-do functionality (add, update, delete todos)
│   └── quotes/        # External API integration to get random quote
├── shared/            # Reusable components, utilities, and hooks
│   ├── components/    # Shared UI components (Button, Modal, etc.)
│   └── utils/         # Utility functions (date formatting, etc.)
├── entities/          # Domain models and business logic (Prisma models, services)
├── pages/             # Next.js routing pages
│   ├── index.tsx      # Home page
│   ├── auth/          # Auth routes (login, register)
│   └── api/           # API routes for todos, auth
└── prisma/            # Prisma schema and migrations