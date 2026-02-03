# Fashion Hub - Premium E-Commerce Store

A modern, full-stack fashion e-commerce application built with:

- Next.js 16 (App Router)
- Prisma ORM + PostgreSQL
- NextAuth.js (Credentials)
- Tailwind CSS v4 (neutral palette: black, white, beige, gray)
- Lucide React icons
- Paystack payment integration ready

## Features
- User authentication (login/register)
- Role-based admin dashboard
- Shopping cart & checkout flow
- Category filtering (Men, Women, Accessories)
- Responsive, production-level UI
- Seeded with real product images

## Setup
```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
