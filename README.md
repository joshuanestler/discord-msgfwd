# discord-msgfwd

This discord bot forwards messages from #text-channels of Servers to another servers #text-channel.

&nbsp;  
&nbsp;

## Setting the parameters

You need to set the parameters in `config.json`:

- `token` is the login token of your discord account.  
   Get it by following [this tutorial](https://github.com/Tyrrrz/DiscordChatExporter/wiki/Obtaining-Token-and-Channel-IDs#how-to-get-a-user-token "How to get the discord user token").
- `forwards` is a list of forwards defined as follows:
  - `srcServer` is the server ID of the server where the `srcChannel` is located
  - `srcChannel` is the channel ID of the channel from which the messages should be forwarded _(text-channels only)_
  - `dstServer` is the server ID of the server where the `dstChannel` is located
  - `dstChannel` is the channel ID of the channel to which the messages should be forwarded _(text-channels only)_
  - `minLength` defines the minimum length a message should have to be forwarded _(set to 0 to disable)_
  - `maxLength` defines the maximum length a message should have to be forwarded _(set to 0 to disable)_
  - `hasAttachments` lets the bot only forward the messages if they have attachments

## Installing the bot

### Docker & docker-compose

Make sure you have installed `docker` and `docker-compose`.

#### If you have `docker-compose`:

Just run

```sh
docker-compose up --build
```

#### If you don't use `docker-compose`:

Build the docker container with

```sh
docker build --tag discord-msgfwd .
```

and start it with

```sh
docker run -d --name discord-msgfwd --restart unless-stopped discord-msgfwd
```

### Native

Make sure that you have `npm` installed.

- Navigate to the project folder
- Run
  ```sh
  npm install discord.js@11.6.4
  npm install --production
  npm start
  ```
