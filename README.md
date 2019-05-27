# API Server


## To build the project follow below steps:

* Install NodeJS, if not installed (Require Node version >= 8.0.0)
```
	$ wget -qO- https://deb.nodesource.com/setup_8.x | bash -
	$ sudo apt-get install -y nodejs
```

* Install npm, if not installed (Require NPM version >= 5.0.0)
```
	$ sudo apt-get install npm
	$ sudo npm install -g yarn
```

* Install mongodb, if not installed

	Install mongo from [here](https://docs.mongodb.com/manual/administration/install-community)

* To build the application
```
	$ yarn
	$ npm install -g pm2
```

* SetUp application server
```
	$ yarn run setup-server
```

* To run the application with customized ENV variable
```
	$ HOST=localhost PORT=3000 yarn start
```

* To run the application with default settings
```
	$ yarn start
```

* Start with PM2
```
	$ pm2 start ./server.js --start --name 'stackexchangeapi'
```

## Open API explorer here: http://localhost:3000/explorer
