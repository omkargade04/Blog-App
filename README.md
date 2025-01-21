# Blog App

**Blog app** is a application where **users** should be authenticated and **post blogs**. The application allow users to view all the blog posts and filter/search blogs of specific author's blog by his/her author ID.

# Description

In this application, **users** can **publish** and view their **blogs**. The application also allows **users** to filter blogs posts by author's **author ID**.

# Features

1. **User Registration**: Users can sign up by providing their **name**, **email**, and **password**.
2. **User Login**: Existing users can log in to their account using their **email** and **password**.
3. **Data fetching**: Data is fetched on the **homepage** and **search author page** using **server-side rendering**.
4. **Blog Viewing**: Users can access all blogs on the **homepage** and their **personal blogs** on **dashboard**.
5. **Blog Filtering/Searching**: Users can **filter/search** **specific author's blog** by **author ID**.
6. **Protected Routes**: Only logged-in users can access the **homepage**, **dashboard** and **create blogs**.
7. Used **Prisma** as ORM to interact with **Postgres** database and to store the data in db.

# View website

Here is the deployed website : [Deployed Link](https://blog-app-blush-one.vercel.app/)<br>
Here is the deployed backend server: [Backend Link](https://blog-app-n9f2.onrender.com/);

# Installation

To install and run this project locally, add the following commands in your terminal, follow these steps:

1. Clone the repository from GitHub:

   ```bash
   `git clone https://github.com/omkargade04/Blog-App.git`

   ```

2. Navigate into the project directory:

```bash
   `cd Blog-App`
```

3. Navigate into client:

```bash
   `cd client`
```

4. Navigate into server:

```bash
   `cd server`
```

## Important

5. Ensure that the version of `Node.js` and `npm` you're using is compatible with the dependencies you're installing. Some dependencies may require specific Node.js versions.
   Run the below command in **client** directory and **server** directory.

```bash
   `npm install -g npm@latest`
```

6. Install `dependencies` for the frontend in **client** directory (assuming you have `Node.js` and `npm` installed):

```bash
   `npm install`
```

7. Install `dependencies` for the backend in **server** directory (assuming you have `Node.js` and `npm` installed):

```bash
   `npm install`
```

8. Install `prisma` for the database ORM in **server** directory

```bash
   `npx prisma init`
```

9. Setup the database by running the migration command

```bash
   `npx prisma migrate dev --name init`
```

10. Create a .env file in the **client** directory and add backend **api endpoint**:

`NEXT_PUBLIC_BASEURL`=`http://localhost:5000` (for **local** server)

`NEXT_PUBLIC_BASEURL`=`https://blog-app-n9f2.onrender.com` (for **deployed** server)

11. Create a .env file in the **server** directory and connect your database with prisma via database url:

`PORT`=`5000` <br>
`DATABASE_URL`=`postgresql://<user>:<password>@localhost:5432/<db_name>?schema=public` <br>
`TOKEN_SECRET`=`your-token` <br>

12. Start the frontend and backend servers:

    **server**: `npm run dev`<br>
    **client**: `npm run dev`

13. Open `http://localhost:3000` to view the application.

# Run the project via **Docker**

## Prerequisites

- Docker

## For Linux System:

To install Docker, run the following commands in your terminal:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## Development Environment For Server

- Navigate into **server** directory
- To get started with development first build the dev containers using the following command

```bash
docker-compose -f docker-compose-server.yaml build
```

- The env file being used for development is called `.env`
- Run the containers using the command

```bash
docker-compose -f docker-compose-server.yaml up
```

## Development Environment For Client

- Navigate into **client** directory
- To get started with development first build the dev containers using the following command

```bash
docker-compose -f docker-compose-client.yaml build
```

- The env file being used for development is called `.env`
- Run the containers using the command

```bash
docker-compose -f docker-compose-client.yaml up
```
