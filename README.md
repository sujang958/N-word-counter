<h1 align="center">
  <br>
    N Word Counter
  <br>
</h1>
<p align="center">
  <bold>A Discord bot that counts the N word</bold>
</p>

> [Invite](https://discord.com/api/oauth2/authorize?client_id=1118903489423228998&permissions=67584&scope=bot)

## Notes

This bot uses [PlanetScale](https://planetscale.com/) whose quota is `1 billion row reads/mo`. If the bot exceeds the quota, it won't be able to count the N words until the end of the month.

## Self-hosting

Make sure you have `Node.js` version 16 or higher.

If you'd like to host this bot yourself with your own `PlanetScale` database, you can clone this repository and create an '.env' file as shown below.

```env
BOT_TOKEN=...bot token here
DATABASE_URL=PlanetScale database URL here
```

And please install the necessary packages.

```sh
$ yarn
```

Finally, start the bot with the following command:

```sh
$ yarn start
```

This will create a new [pm2](https://pm2.keymetrics.io/) instance. You can use [pm2](https://pm2.keymetrics.io/) to manage the instance.

---

_Made with ❤️ by sujang958_
