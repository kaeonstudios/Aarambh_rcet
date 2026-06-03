# AarambhX Backend

This repository contains the backend implementation for the AarambhX platform, built using Next.js App Router API Routes and Prisma with PostgreSQL.

## Features Implemented
- **API Routes (`/api/applications`)**: Handles both public form submissions and admin fetching.
- **Admin Auth (`/api/admin/login`, `/api/admin/logout`)**: Basic credential-based auth using JWT cookies.
- **Analytics (`/api/admin/analytics`)**: Endpoints to fetch total applications, applications per stage, and recent submissions.
- **File Handling (`/api/upload`)**: Video upload logic with 100MB size validation.
- **Database Schema (`prisma/schema.prisma`)**: Defined exactly as requested with all fields.
- **Security**: Next.js Middleware for protecting admin routes, Zod validation for inputs.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Copy `.env.example` to `.env` and fill in the required variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - Admin credentials (`ADMIN_USER_1`, `ADMIN_PASS_1`, etc.)
   - Storage configuration for uploads

3. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Google Forms Integration
To sync Google Form submissions, set up a Google Apps Script webhook on the form that sends a `POST` request to `https://your-domain.com/api/applications` with the form payload matching the `applicationSchema`.

## Storage
File storage is currently mocked in `/api/upload/route.ts`. Please replace the mock logic with your preferred storage provider (e.g., Supabase Storage or Cloudinary) using the provided `TODO` markers.
