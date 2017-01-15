#KUIS GAMBAR SAKU

A simple web based game, there are the components to build it, such as :

- Backend : <a href="https://nodejs.org/en/">NodeJS</a>
- Database : <a href="https://www.mongodb.com/">MongoDB</a>
- NodeJS Framework : <a href="http://expressjs.com/">Express JS</a>
- Template Engine : <a href="http://handlebarsjs.com">Express JS</a>

and another useful tools :

- Handlebars & ExpressJS helpers : <a href="https://www.npmjs.com/package/express-handlebars">express-handlebars</a>
- Incoming request Parser : <a href="https://www.npmjs.com/package/body-parser">body-parser</a>
- MongoDB driver NodeJS : <a href="https://www.npmjs.com/package/mongodb">mongodb</a>
- Session middleware ExpressJS : <a href="https://www.npmjs.com/package/express-session">express-session</a>
- Cookie Parser : <a href="https://www.npmjs.com/package/cookie-parser">cookie-parser</a>
- Useful functional programming helpers : <a href="http://underscorejs.org/">Underscorejs</a>
- Http Unit Test helpers : <a href="https://www.npmjs.com/package/supertest/">supertest</a>
- Unit Test Framework : <a href="http://mochajs.org/">Mochajs</a>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Installing

- Clone the repository
```
git clone https://github.com/selamatpurba04/kuisgambarsaku.git kuisgambarsaku
```

- install npm packages
```
cd kuisgambarsaku
npm install
```

- install bower packages
```
bower install
```

automate build
```
gulp
```

- install <a href="https://www.mongodb.com/">MongoDB</a> and make sure mongodb service already running
```
service mongod status
```

- run mongod with a local data directory
```
mongod --dbpath=data
```

- run the application
```
nodejs index.js
```
