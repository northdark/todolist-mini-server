#Mini To Do list Node & Express server

We have the following API structure:

```
GET /api/:user

POST /api/:user   || data: text && checked

GET /api/:user/:id

POST /api/:user/:id || data: text && checked

DELETE /api/:user/:id
```

If you want to see all the items posted to the server

```
GET /all
```

If you want to send a test POST and receive an html response

```
GET /html   || data: text
```
