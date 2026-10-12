# censoapi

Express/MongoDB REST API for a voter census: role-based user accounts (user/moderator/admin), JWT auth, and CRUD endpoints for voter ("Votante") records.

> Client project. Started in February 2024, when the client of [BackendElectores](https://github.com/CristopherReyesP/BackendElectores) hired me again for a new version of their voter census system. This repository holds an early, incomplete copy of that work.

## What it does

- `src/app.js` sets up Express with `cors`, `helmet`, `morgan` logging and JSON body parsing, and mounts routers under `/api`, `/api/votantes`, `/api/users`, `/api/auth`.
- `src/libs/initialSetup.js` seeds the `user`/`moderator`/`admin` roles and creates a default admin user on startup if none exists, using `ADMIN_EMAIL`/`ADMIN_USERNAME`/`ADMIN_PASSWORD`.
- Auth (`auth.controller.js`): signup (creates a `User`, assigns roles, hashes handled on the `User` model, issues a JWT) and signin (verifies password, issues a JWT).
- `middlewares/authJwt.js` provides `verifyToken`, `isModerator`, `isAdmin` used to protect the voter routes.
- Voter routes (`routes/votante.routes.js`) intend to expose list/get/create/update/delete for `Votante` documents (name, address, CURP, elector key, municipality, section, survey answers, vote), similar in shape to the schema used in the related `BackendElectores` project.

Status: the voter endpoints are unfinished. Some route, controller and model names do not match yet, so they do not run end-to-end as committed.

## Tech Stack

- Node.js, Express 4 (ES modules, `"type": "module"`)
- MongoDB via Mongoose 8
- jsonwebtoken, bcryptjs, cors, helmet, morgan, dotenv

Environment variables read via `process.env` (values not committed): `PORT`, `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`.

## Running Locally

```
npm install
npm run dev     # nodemon src/index.js
```

Defaults exist for `MONGODB_URI` (`mongodb://localhost/censo`) and `PORT` (4000) if no `.env` is provided.

## Key techniques

- Express REST API structure with routes/controllers/models
- Mongoose schemas and role-based data modeling
- JWT issuing/verification and authorization middleware (`verifyToken`, `isAdmin`, `isModerator`)
- Application bootstrap/seed logic (default roles and admin user)
