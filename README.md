# 🍽️ Platera — Backend API

**The server-side engine powering the FoodHub food ordering platform.**

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)

🔗🌐 **Frontend:** [frontend-github-link.com](https://github.com/tabib-e-alahi/next_level_assignment_4_frontend_part)


---

## 📖 What is This?

This is the **backend (server-side)** of the FoodHub platform. Think of it as the engine running behind the scenes — it handles everything the user doesn't see directly: storing data in the database, verifying logins, processing orders, and responding to requests from the frontend.

It is a **REST API**, meaning the frontend sends requests to it (like "get all meals" or "place an order") and it responds with data in JSON format.

---

## 🗂️ API Modules Overview

The backend is organized into clean, separate modules — each handling one area of the application:

| Module | Base URL | What It Handles |
|---|---|---|
| **Auth** | `/api/auth` | Register, login, get current user |
| **Public** | `/api/public` | Browse meals, providers, categories (no login needed) |
| **Provider** | `/api/provider` | Provider profile, manage meals, view & update orders |
| **Customer** | `/api/customer` | Customer profile management |
| **Cart** | `/api/cart` | Add/remove items, manage shopping cart |
| **Orders** | `/api/orders` | Place orders, view order history |
| **Reviews** | `/api/reviews` | Submit and view meal reviews |
| **Admin** | `/api/admin` | Manage users, orders, and categories |

---

## 🔐 How Authentication Works

> *In simple terms: when you log in, the server gives you a digital key (called a JWT token). Every time you make a request that requires authentication, you send that key along — and the server checks it.*

- Passwords are **hashed** (scrambled one-way) using **bcrypt** before storing — your actual password is never saved
- Login returns a **JWT token** which the frontend stores and uses for all protected requests
- Every protected route checks the token and verifies the user's **role** (Customer, Provider, or Admin)
- Suspended accounts are automatically **blocked** from accessing the API

---

## 🗃️ Database Models

The database has the following core tables (models):

| Model | Description |
|---|---|
| **User** | All users — customers, providers, and admins |
| **ProviderProfile** | Business details for food providers (name, logo, address, availability) |
| **Meals** | Individual meal listings with price, image, dietary preferences |
| **Category** | Cuisine categories (e.g. Bengali, Chinese, Fast Food) |
| **Cart / CartItem** | A user's active shopping cart and its items |
| **Order / OrderItem** | Placed orders and the individual meals within them |
| **Reviews** | Customer ratings and comments on meals |

**Order statuses:** `PLACED` → `PREPARING` → `READY` → `DELIVERED` (or `CANCELLED`)

---

## ✨ Key Features

- 🔐 **JWT Authentication** — Secure token-based login with role enforcement
- 👥 **Role-Based Access Control** — Separate permissions for Customer, Provider, and Admin
- 🍛 **Full Meal Management** — Providers can create, update, and delete their menu items
- 🛒 **Cart System** — Full cart CRUD with per-user isolation
- 📦 **Order Lifecycle** — From placement to delivery with real-time status updates
- ⭐ **Reviews & Ratings** — Customers can rate meals after ordering
- 🏪 **Provider Profiles** — Business info, logo, availability toggle
- 📊 **Admin Controls** — Suspend users, manage categories, view all orders
- 🌍 **Public Routes** — Browse meals and providers without needing an account
- 🔢 **Pagination & Sorting** — Built-in helpers for handling large data sets
- 🌱 **Seed Scripts** — Ready-made scripts to populate admin and category data

---

## 🛠️ Tech Stack

> *Plain-English explanation of every tool used:*

| Technology | What It Does |
|---|---|
| **Node.js** | The JavaScript runtime — lets JavaScript run on the server |
| **Express 5** | The web framework — handles incoming HTTP requests and routes them to the right code |
| **TypeScript** | Adds type safety to JavaScript — catches bugs before the app runs |
| **Prisma 7** | The database ORM — lets you interact with the database using TypeScript instead of raw SQL |
| **PostgreSQL** | The relational database — stores all the app's data in structured tables |
| **JSON Web Token (JWT)** | Creates and verifies login tokens for secure authentication |
| **bcryptjs** | Hashes (encrypts) passwords before saving them to the database |
| **CORS** | Allows the frontend (on a different domain) to safely talk to this backend |
| **dotenv** | Loads secret config values (like database passwords) from a `.env` file |
| **tsx** | Runs TypeScript files directly during development without pre-compiling |
| **tsup** | Bundles the TypeScript code into a production-ready JavaScript build |
| **pnpm** | A fast and efficient package manager |

---

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema/              → Database models (User, Meals, Order, etc.)
│   └── migrations/          → Database version history (auto-generated)
├── src/
│   ├── modules/
│   │   ├── auth/            → Register, login, get current user
│   │   ├── provider/        → Provider profile + meal + order management
│   │   ├── customer/        → Customer profile management
│   │   ├── cart/            → Shopping cart logic
│   │   ├── order/           → Order placement and tracking
│   │   ├── reviews/         → Meal ratings and comments
│   │   ├── admin/           → Admin controls (users, orders, categories)
│   │   └── public/          → Open routes (no auth required)
│   ├── middlewares/
│   │   ├── auth.ts          → JWT verification + role guard
│   │   ├── providerGuard.ts → Ensures provider profile exists
│   │   └── globalErrorHandler.ts → Catches and formats all errors
│   ├── lib/
│   │   └── prisma.ts        → Prisma client instance
│   ├── utils/               → Helper functions (pagination, validation, etc.)
│   ├── scripts/             → Seed scripts for admin and categories
│   ├── app.ts               → Express app setup + route registration
│   └── server.ts            → Server entry point
└── .env.example             → Template for environment variables
```

---

## 🚀 How to Run Locally

Follow these steps to get the backend running on your own computer.

### ✅ Prerequisites

Make sure you have these installed:

- **Node.js** (v20 or higher) → [Download here](https://nodejs.org/)
- **pnpm** → Install by running: `npm install -g pnpm`
- A **PostgreSQL** database (local or cloud — e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com))

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

> Replace the URL with your actual GitHub repo link.

---

### Step 2 — Install Dependencies

```bash
pnpm install
```

---

### Step 3 — Set Up Environment Variables

Create a `.env` file in the root of the project:

```bash
cp .env.example .env
```

Then fill in your values:

```env
DATABASE_URL="postgresql://username:password@host:5432/database_name"

PORT=8000
FRONTEND_URL="http://localhost:3000"

JWT_SECRET_KEY="your-super-secret-key-here"

# Admin seed data
ADMIN_NAME="Admin"
ADMIN_EMAIL="admin@foodhub.com"
ADMIN_PASSWORD="securepassword123"
```

---

### Step 4 — Run Database Migrations

This sets up all the tables in your database:

```bash
npx prisma migrate deploy
```

---

### Step 5 — Seed Initial Data *(Optional but Recommended)*

Populate the database with an admin account and default categories:

```bash
pnpm seed:admin        # Creates the admin user
pnpm seed:categories   # Adds default food categories
```

---

### Step 6 — Start the Development Server

```bash
pnpm dev
```

The API will be running at **[http://localhost:8000](http://localhost:8000)** 🎉

Test it by visiting: `http://localhost:8000/` — you should see `Hello, World!`

---

## 🏗️ Build for Production

```bash
pnpm build   # Compiles TypeScript to JavaScript
pnpm start   # Runs the compiled production build
```

---

## 🌐 Deployment

This project is configured for deployment on **[Vercel](https://vercel.com)** (the `vercel` package is included).

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env` in the Vercel dashboard
4. Deploy! ✅

> Make sure your PostgreSQL database is hosted on a cloud provider (Neon, Supabase, Railway, etc.) that is accessible from Vercel's servers.

---

## 📬 Contact

Have questions or feedback? Feel free to reach out or open an issue on GitHub.