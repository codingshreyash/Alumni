# CSC Alumni Network API Documentation

This document provides a brief overview of all available API routes in the Alumni Network backend. Easiest way to check is to run backend and look at the /docs page.

## Authentication Routes (`/login`)
- `POST /login/access-token`: Authenticates user and returns JWT access token
- `POST /login/test-token`: Validates current access token
- `POST /login/reset-password`: Sends password reset email
- `POST /login/reset-password/{token}`: Resets password using token

## User Routes (`/users`)
- `GET /users/`: Retrieves list of visible users (paginated)
- `POST /users/`: Creates new user (admin only)
- `PATCH /users/me`: Updates current user's profile
- `PATCH /users/me/password`: Updates current user's password
- `GET /users/me`: Gets current user's profile
- `DELETE /users/me`: Deletes current user's account
- `POST /users/signup`: Registers new user (public)
- `GET /users/{user_id}`: Gets specific user by ID
- `PATCH /users/{user_id}`: Updates specific user (admin only)
- `DELETE /users/{user_id}`: Deletes specific user (admin only)
- `GET /users/company/{company_name}`: Gets users by company

## Company Routes (`/companies`)
- `GET /companies/`: Retrieves list of all companies
- `GET /companies/employee_counts`: Gets current employee counts for all companies
- `GET /companies/{name}`: Gets specific company details
- `POST /companies/`: Creates new company
- `GET /companies/all_employees/{name}`: Gets all employees (current and past) for a company
- `GET /companies/current_employees/{name}`: Gets current employees for a company

## Interview Routes (`/interviews`)
- `GET /interviews/`: Retrieves all interviews
- `POST /interviews/`: Creates new interview record
- `POST /interviews/bulk`: Creates multiple interview records

## Employment Routes (`/employment`)
- `GET /employment/`: Gets employment history
- `POST /employment/`: Creates new employment record
- `GET /employment/company/{company_name}`: Gets employment history for a company

## Request Routes (`/requests`)
- `GET /requests/`: Gets all connection requests
- `POST /requests/`: Creates new connection request
- `GET /requests/{request_id}`: Gets specific connection request
- `PATCH /requests/{request_id}`: Updates connection request status

## Email Routes (`/emails`)
- `GET /emails/`: Gets all email addresses
- `POST /emails/`: Adds new email address
- `DELETE /emails/{email}`: Removes email address

## Notes
- All routes require authentication unless specified otherwise
- Pagination is available on list endpoints using `skip` and `limit` parameters
- Admin-only routes are marked with (admin only)
- Public routes are marked with (public)
