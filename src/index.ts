import { Command } from 'commander';
import figlet from 'figlet';
import { listInventory } from './list/list';
import { populateWarehouse } from './populate/populate';
import { sellProduct } from './sell/sell';

console.log(figlet.textSync('Warehouse'));

const program = new Command();

const populate = program.command('populate');
populate
  .description('Populate warehouse db from json files')
  .argument('<connectionString>', 'connectionString')
  .argument('<inventoryPath>', 'inventoryPath')
  .argument('<productsPath>', 'productsPath')
  .action(async (connectionString, inventoryPath, productsPath) => {
    const result = await populateWarehouse(
      connectionString,
      inventoryPath,
      productsPath,
    );
    console.log(
      `Warehouse populated!\nArticles added: ${result?.data.articles.length}\nProducts added: ${result?.data.products.length}`,
    );
  });

const list = program.command('list');
list
  .description('List products in the warehouse')
  .argument('<connectionString>', 'connectionString')
  .action(async (connectionString) => {
    await listInventory(connectionString);
  });

const sell = program.command('sell');
sell
  .description('Sell product (remove from warehouse)')
  .argument('<connectionString>', 'connectionString')
  .argument('<productName>', 'productName')
  .action(async (connectionString, productName) => {
    await sellProduct(connectionString, productName);
  });

program
  .version('1.0.0')
  .description('A CLI for creating and managing a warehouse')
  .parse(process.argv);
