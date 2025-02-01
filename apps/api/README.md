## Routes

Request examples made using `httpie` python package with uv package manager.

**Create a user**:

```sh
uv run http POST :3333/users name=Gabriel email=dmenezes.gabriel@acme.com password=123456
```

**Authenticate a user**:

```sh
uv run http POST :3333/sessions/password email=dmenezes.gabriel@acme.com password=123456
```

**Get a user profile**:

```sh
uv run http GET :3333/profile Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NWY2NDQwMy04MjY4LTRhOGItYWI2Ni02ZWZhMjFmY2Q5OTUiLCJpYXQiOjE3Mzg0MzA1NDgsImV4cCI6MTczOTAzNTM0OH0.st-peg81z8Ew4OLCPwuvdGZ3zlat-qCd3oYDWKGB128"
```
