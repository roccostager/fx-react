# fx-react
A **single-page application frontend**, built with React Vite. This repository acts as a *boilerplate template* for **frontend project structure** and **authentication implementation**.

> **Important Information:** This repository has a **co-repository** for its backend.  
> The co-repository link is: https://github.com/roccostager/bx-node.  
> *The project will (obviously) not work without a backend*.

## Features
This repository contains the boilerplate for a single-page application. It also has authentication pre-implemented.  
Features included in this template are:

- **Tailwindcss**, pre-installed.
- **React-router** set up.
- Simple **API fetching library**, already integrated with auth.
- Handling of **jwt-access tokens in memory**, and secure handling of **long-term session cookies in HTTP-only cookie** storage.
- **Boilerplate components and pages** to verify things are working. (*Namely, `<Header />` and `<AppLayout />` components. Again, also integrated with authentication already.*)

### Future Features
Some features in consideration for future implementation are:
- Improved **user-feedback**, which has currently been neglected in favour of functionality.
- **Payment integration**.
- **Containerisation** with docker, for more consistent deployment.
- *Or*, a **GitHub actions workflow** to quickly deploy to the cloud.

## Setup Instructions
1. Run `npm install` to install package dependencies.
2. To start a dev server, use `npm run dev`.
3. Do note that this project will only work if it is pointed to its co-repository in `.env.local`, and a backend + PostgreSQL server is running.