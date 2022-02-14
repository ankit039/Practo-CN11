# CN11

# NodeJS app integerated with Sentry

### Run below command in your Machine

```
git clone https://github.com/ankit039/Practo-CN11.git
npm install
```

### Make `.env` file with following entry

`SENTRY_DSN: <your_sentry_dsn_here>`

```
npm start
```

### Send get request on url `/debug-sentry`

- You will see some response like

```
{
    "errorid":"19e25436f4874d9aabb91696d4e1b445",
    "sucesss":false
}
```
### Check Sentry Dashboard on WebApp for Issues