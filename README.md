
<br />
<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/languages/code-size/gustavomaltez/gas-station-management-system?style=for-the-badge">
  <img alt="Language" src="https://img.shields.io/github/languages/top/gustavomaltez/gas-station-management-system?style=for-the-badge">
  <img alt="Total Lines" src="https://img.shields.io/tokei/lines/github/gustavomaltez/gas-station-management-system?style=for-the-badge">
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/gustavomaltez/gas-station-management-system?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/github/license/gustavomaltez/gas-station-management-system?style=for-the-badge">
</p>

## 🧷 About this project

This is just a simple system for managing gas stations developed as a college group project related to "introduction to databases" subject. The idea behind this application is practice some new concepts related to software development (that will be covered in the next sections) and also develop an app that will be presented as a group project on the "introduction to databases" college subject.

## 📃 Project Purposes

As discussed on the previous section, in this project I don't want just do the activities proposed on the "Introduction to Database" subjective, but also practice some new thing that I have been learning during the past months.

- ✅ Create a high performance monorepo codebase using turborepo.
- ✅ Integrate bash scripts into packages scripts.
- ✅ Manage dependencies using pnpm.
- ✅ Learn how to use the new released TypeORM version.
- ✅ Develop a RESTful API fully test covered and following the best code practices.
- ✅ Develop a frontend application using tailwindcss and vitejs.
- ✅ Learn how to run PostgreSQL and Redis in Docker.

## 🔨 Running the application

1. Clone this repo

    ```sh
    git clone https://github.com/gustavomaltez/gas-station-management-system
    ```

2. Create your PostgreSQL database
     - Using docker:

    ```sh
      docker run --name AnyName -e POSTGRES_PASSWORD=YourPassword -p 5432:5432 -d postgres
    ```

     - Using PostgreSQL CLI:
    Check the official documentation [here](https://www.postgresql.org/docs/current/tutorial-start.html)
    
3. Add your PostgreSQL credentials to the .env file into the API package
    ```sh
      POSTGRES_USERNAME="AnyName"
      POSTGRES_PASSWORD="YourPassword"
      POSTGRES_DATABASE="postgres"
      POSTGRES_HOST="localhost"
      POSTGRES_PORT="5432"
    ```

## 📄 License

null
