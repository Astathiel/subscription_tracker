📋 Project: Subscription Tracker

Live Demo: https://subscription-tracker-ashen.vercel.app/ GitHub: https://github.com/Astathiel

## Overview
A full-stack serverless application designed to track monthly recurring expenses. The app allows users to securely log in, manage a personal dashboard of subscriptions, calculate total monthly costs, and simulate a premium upgrade flow.

## Technical Stack
Frontend: React (Vite), JavaScript (ES6+), CSS3

Backend (BaaS): Supabase (PostgreSQL, Authentication, Edge API)

Payments: Stripe (Payment Links, Test Mode Integration)

Deployment/DevOps: Vercel (CI/CD from GitHub), Git

## Key Features Implemented
Secure Authentication: Integrated Supabase Auth (Magic Link/Email) to handle user sessions and protected routes.

Database Security: implemented Row Level Security (RLS) policies in PostgreSQL to ensure strict data isolation (users can only access their own records).

Real-time UI: Utilized React State and Effect hooks to build a responsive "Add & Refresh" cycle without page reloads.

Payment Integration: Connected a "Pro" upgrade feature using Stripe Payment Links.

Environment Management: Configured secure .env variables for API keys in both local development and production environments.
