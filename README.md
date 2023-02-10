# warehouse

A CLI for creating and managing a warehouse.

## Prerequisites

You will need to have docker set up to spin up the database (although a connection can be made to any mongoDB database).

## Node

This app was built using node 17

To check your node version:

node -v

To switch to version 17:

nvm use 17

## Testing

To run tests:

`npm run tests`

## Running

### Database Setup

In order to use the CLI you will need to connect to a mongoDB called 'warehouse'. You can spin one of these up by running:

`docker compose up`

If you dont already have docker desktop you can download it [here](https://www.docker.com/products/docker-desktop/).

When you are done, you can spin the db down by running:

`docker compose down`

The connection string to this database is as follows:

`mongodb://localhost:27017/warehouse`

### Running the CLI

First:

`npm i`

Then to build:

`npm run build`

You can then either run the CLI from this repository or install it globally.

To run from this repository:

`node dist/index.js [command] [arguments]`

To install globally:

`npm install -g`

You will then be able to run from anywhere, e.g:

`warehouse`

Will output:

```
\ \      / /_ _ _ __ ___| |__   ___  _   _ ___  ___
  \ \ /\ / / _` | '__/ _ \ '_ \ / _ \| | | / __|/ _ \
   \ V  V / (_| | | |  __/ | | | (_) | |_| \__ \  __/
    \_/\_/ \__,_|_|  \___|_| |_|\___/ \__,_|___/\___|

Usage: index [options] [command]

A CLI for creating and managing a warehouse

Options:
  -V, --version                                               output the version number
  -h, --help                                                  display help for command

Commands:
  populate <connectionString> <inventoryPath> <productsPath>  Populate warehouse db from json files
  list <connectionString>                                     List products in the warehouse
  sell <connectionString> <productName>                       Sell product (remove from warehouse)
  help [command]                                              display help for command
```

## Examples

**Populate**
There are example `inventory.json` and `products.json` files in this repository which can be used to populate the database. If running from the warehouse directory the path to these files will be as follows:

`'./examples/inventory.json'`

and:

`'./examples/products.json'`

e.g:

`node dist/index.js populate  'mongodb://localhost:27017/warehouse' './examples/inventory.json' './examples/products.json'`

**List**

e.g:

`node dist/index.js list  'mongodb://localhost:27017/warehouse`

**Sell**

e.g:

`node dist/index.js sell  'mongodb://localhost:27017/warehouse' 'Dining Chair'`
