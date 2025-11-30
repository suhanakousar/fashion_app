# Fashion Designer Portfolio & Client Management System

## Overview
A complete production-ready web application for a small fashion designer featuring a public portfolio gallery, client booking system, and comprehensive admin dashboard for order lifecycle management.

## Tech Stack
- **Frontend**: React 18 with TypeScript, Vite, TailwindCSS, shadcn/ui
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based with bcrypt password hashing
- **File Uploads**: Multer for local storage
- **PDF Generation**: jsPDF
- **Exports**: CSV via archiver for zip files

## Architecture

### Database Schema
- `users` - Designer accounts with business info
- `designs` - Portfolio designs with pricing and categories
- `design_images` - Multiple images per design with sort order
- `clients` - Customer records (matched by phone number)
- `measurements` - Client measurement history
- `orders` - Booking orders with status workflow
- `order_files` - Reference images uploaded with bookings
- `billing_entries` - Multi-line billing with payment tracking
- `notifications` - Admin notifications for new orders/payments
- `categories` - Design categories

### Order Lifecycle
1. **Requested** - New booking from client
2. **Accepted** - Designer confirms order
3. **In Progress** - Work has started
4. **Ready for Delivery** - Design completed
5. **Delivered** - Order fulfilled

### Key Features
- Public portfolio gallery with filtering and search
- Multi-step booking form with measurements and file uploads
- Client matching by phone number (automatic)
- WhatsApp integration for communications
- PDF invoice generation
- CSV exports for clients, orders, and full backup
- Mobile-first responsive design

## Project Structure
```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route pages
│   │   ├── admin/      # Admin dashboard pages
│   │   └── ...         # Public pages
│   ├── lib/            # Auth, theme, query client
│   └── hooks/          # Custom React hooks
server/
├── db.ts              # Database connection
├── storage.ts         # Data access layer
├── routes.ts          # API endpoints
├── seed.ts            # Database seeding script
└── index.ts           # Express server setup
shared/
└── schema.ts          # Drizzle schema & types
```

## API Endpoints

### Public
- `GET /api/designs` - Published designs
- `GET /api/designs/:id` - Design details
- `GET /api/categories` - All categories
- `GET /api/orders/:id` - Order confirmation details
- `POST /api/book` - Create booking (multipart/form-data)

### Admin (requires auth)
- `POST /api/auth/login` - Designer login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user
- `GET /api/admin/dashboard` - Dashboard stats
- `CRUD /api/admin/designs` - Design management
- `GET /api/admin/clients` - All clients with details
- `GET /api/admin/clients/:id` - Client profile
- `POST /api/admin/clients/:id/measurements` - Add measurement
- `CRUD /api/admin/orders` - Order management
- `POST /api/admin/orders/:id/billing` - Add billing entry
- `PATCH /api/admin/billing/:id` - Update payment status
- `GET /api/admin/notifications` - Admin notifications
- `GET /api/admin/export/clients` - CSV export
- `GET /api/admin/export/orders` - CSV export
- `GET /api/admin/export/all` - Full backup zip
- `GET /api/admin/orders/:id/invoice` - PDF invoice

## Design System
- **Fonts**: Playfair Display (serif, headlines), Inter (sans, body)
- **Theme**: Light/dark mode support
- **Components**: shadcn/ui base with custom styling
- **Colors**: Neutral palette with primary accent

## Running the Project
```bash
npm run dev        # Start development server
npm run db:push    # Push schema to database
npx tsx server/seed.ts  # Seed sample data
```

## Demo Credentials
- Email: `designer@atelier.com`
- Password: `password123`

## Recent Changes
- Initial implementation of complete fashion designer platform
- All CRUD operations for designs, clients, orders, and billing
- Multi-step booking form with file uploads
- WhatsApp integration links
- PDF invoice generation
- CSV export functionality
- Rate limiting on booking endpoint

## User Preferences
- Mobile-first responsive design
- Boutique aesthetic with elegant typography
- Simple, streamlined admin workflows
- Automatic client matching by phone number
