# Filler 
_Filler_ is a javascript web application that creates gcode paths for 3D printing scaffolds with research purposes on tissue engineering applications.

It is divided in two pieces of software, one for the [back-end](https://filler-cidep-b.herokuapp.com) and another for the [front-end](https://filler-cidep.herokuapp.com). 

This project was generated with [Angular CLI] and still is a work in progress.

## Repositories
In a similar fashion, the app repositories are divided into [back-end](https://github.com/gerarddo/filler-cidep-api) and [front-end](https://github.com/gerarddo/filler-cidep)

---
## Filler API

This is the [live demo](https://filler-cidep.herokuapp.com) for the Filler API .


## Getting Started

```
$ git clone https://github.com/gerarddo/filler-cidep-api.git
$ cd filler-cidep-api
$ npm install
$ node app.js
```

Make your http request to [http://localhost:3000](http://localhost:3000).

## Routes

| Path | HTTP Verb | Purpose |
|---|---|---|
| / | GET | Show homepage |
| /simulator | GET | Show simulator |
| /fill | POST | Generate a Scaffold |


## Prerequisites

Filler API runs on [Node.js](https://nodejs.org/en/) and makes use of [Express](https://expressjs.com).

## Authors

* **Gerardo Mijares** - [lapsusdev.com](https://lapsusdev.com)

## License

This project is licensed under the [MIT License](https://en.wikipedia.org/wiki/MIT_License).


