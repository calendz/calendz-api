<p align="center"><a href="https://calendz.app/" target="_blank" rel="noopener noreferrer"><img width="100" src="https://avatars3.githubusercontent.com/u/51510476?s=400&u=e110cf083bbc29eab84d4dceb85c94d7a87882db&v=4" alt="calendz's logo"></a></p>

<p align="center">
  <a href="https://travis-ci.com/calendz/calendz-api"><img src="https://travis-ci.com/calendz/calendz-api.svg?branch=develop" alt="Build status of develop branch"></a>
  <a href='https://coveralls.io/github/calendz/calendz-api?branch=develop'><img src='https://coveralls.io/repos/github/calendz/calendz-api/badge.svg?branch=develop' alt='Coverage Status' /></a>
  <br>
  <a href="https://dependabot.com/"><img src="https://img.shields.io/david/calendz/calendz-api.svg?maxAge=3600" alt="Dependencies status"></a>
  <br>
</p>

<h2 align="center">CALENDZ API</h2>

---

## Introduction

Ce repository représente l'API utilisée pour faire le lien entre le front (Vue.js) et la base de données (MongoDB) de calendz.

Ces données étant évidement privées, la (quasi) totalité des routes nécessitent d'être authentifié.

## Ecosystème

L'API de calendz est développée avec les frameworks et outils suivants* :

| Librairie      | Version | Description                                                                             |
|----------------|---------|-----------------------------------------------------------------------------------------|
| [Node.js]      | 18.13.0 | Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.                |
| [Express]      | 4.18.2  | Fast, unopinionated, minimalist web framework for Node.js                               |
| [Mongoose]     | 6.8.4   | Elegant MongoDB object modeling for Node.js                                             |
| [JsonWebToken] | 9.0.0   | Industry standard RFC 7519 method for representing claims securely between two parties. |
| [Nodemailer]   | 6.9.0   | Nodemailer is a module for Node.js applications to allow easy as cake email sending.    |

**(Liste non exhaustive, uniquement les librairies principales sont présentées)*

## Installation & utilisation

### Pré-requis

* Installer Node 18.13.0 et MongoDB 6.0.3
  * Créer un fichier `.env` à la source de ce repository contenant les valeurs suivantes (modifiables selon vos besoins)

        NODE_ENV=development

        FRONT_URL=http://localhost:8080

        APP_PORT=3001
        APP_PORT_TEST=3002

        POPULATE=true

        DB_HOST=calendz-database
        DB_PORT=27017
        DB_NAME=calendz
        DB_USER=username
        DB_PASSWORD=password

        COOKIE_SECRET=imasecret
        COOKIE_SECURE=false

        JWT_SECRET=imasecret
        JWT_EXPIRATION=900
        JWT_EXPIRATION_REFRESH=30
        JWT_RAW_TOKEN=imasecret

        MAILER_ENABLED=true
        MAILER_USE_TLS=true
        MAILER_PORT=4221
        MAILER_HOST=example.com
        MAILER_USER=my@email.com
        MAILER_PASSWD=password

### Lancement

* Lint : `npm run lint` (corrige la syntaxe du code grâce à [ESLint](https://github.com/eslint/eslint))
* Tests : `npm run test` (lance les tests effectués lors de l'intégration continue)
* Tests : `npm run test:mock` (insert un jeu de données dans la base afin d'effectuer les tests)
* Tests : `npm run test:coverage` (lance l'analyse de la couverture du code)
* Tests : `npm run test:coveralls` (upload les résultats du coverage sur coveralls.io)
* Production : `npm run start` (lance via node, aucun process manager n'est inclus par défaut)
* Développement : `npm run dev` (lance avec [nodemon](https://nodemon.io/))

[Node.js]: https://github.com/nodejs/node
[Express]: https://github.com/expressjs/express
[Mongoose]: https://github.com/Automattic/mongoose/
[JsonWebToken]: https://github.com/auth0/node-jsonwebtoken
[Nodemailer]: https://github.com/nodemailer/nodemailer
