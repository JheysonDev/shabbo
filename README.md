# SHabbo Roleplay (TOY)

This repository contains the source code of the emulator and the client of a Habbo emulator. **This project is just for learning purposes**.

## Features

### API
- Automatic database tables creation (Thanks to `typeorm`)
    - Create default values when the tables are empty
- Websocket server

### Web
- Pages
    - Login (10%)
    - Client
- Websocket client
- Room generation
- Users in room generation
- Walk across a room

## Getting Started
1. Clone the [resources](https://github.com/danielsolartech/shabbo-resources) repository and start it:
```sh
$ git clone https://github.com/danielsolartech/shabbo-resources.git
$ cd shabbo-resources
$ npm install
$ npm start
```

2. Clone this repository and then configure the `/api/.env` file.

3. Create the database:
```sql
CREATE DATABASE db_name;
```

> NOTE: You don't need to insert anything, the API will do it for you.

4. Execute the API:
```sh
$ cd api
$ npm install
$ npm run build
$ npm start
```

5. Configure the settings on your database (`settings` table).

6. Execute the web:
```sh
$ cd web
$ npm install
$ npm start
```

> NOTE: This will open a new tab in your default browser.

7. Sign in using the `SHabbo` username or create a new account in the database.

## Discord Server
If you need support or you just want to talk about SHabbo, feel free to join us on our [Official Discord Server](https://discord.gg/BxzgMDHsmc).
