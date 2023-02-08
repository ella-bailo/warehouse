import { Command } from 'commander';
import figlet from 'figlet';

const program = new Command();

console.log(figlet.textSync('Warehouse'));

program
  .version('1.0.0')
  .description('A CLI for creating and managing a warehouse')
  .command('create <inventoryPath> <productsPath>', 'create warehouse database')
  .command('kill', 'kill warehouse database')
  .command('list', 'List products in warehouse')
  .command('sell <ProductId>', 'Sell a product (Remove from warehouse)')
  .parse(process.argv);
