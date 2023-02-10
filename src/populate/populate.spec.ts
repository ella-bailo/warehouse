import { getMongod, stopMongod } from '../connection';
import { populateWarehouse } from './populate';

describe('populate', () => {
  let connectionString: string;
  let mongodServer: any;
  beforeAll(async () => {
    const mongod = await getMongod();
    connectionString = mongod.connectionString;
    mongodServer = mongod.mongodServer;
  });
  beforeEach(async () => {
    const mongod = await getMongod();
    connectionString = mongod.connectionString;
  });
  afterEach(async () => {
    await stopMongod(mongodServer);
  });

  describe('populateWarehouse', () => {
    it('returns correct result', async () => {
      const mockInventoryPath = './src/test/mocks/inventory.mock.json';
      const mockProductsPath = './src//test/mocks/products.mock.json';

      const result = await populateWarehouse(
        connectionString,
        mockInventoryPath,
        mockProductsPath,
      );

      expect(result?.data.articles).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            artId: '1',
            name: 'leg',
            stock: 12,
          }),
          expect.objectContaining({
            artId: '2',
            name: 'screw',
            stock: 17,
          }),
          expect.objectContaining({
            artId: '3',
            name: 'seat',
            stock: 2,
          }),
          expect.objectContaining({
            artId: '4',
            name: 'table top',
            stock: 1,
          }),
        ]),
      );
      expect(result?.data.products).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Dining Chair',
            containArticles: expect.arrayContaining([
              expect.objectContaining({
                artId: '1',
                amountOf: 4,
              }),
              expect.objectContaining({
                artId: '2',
                amountOf: 8,
              }),
              expect.objectContaining({
                artId: '3',
                amountOf: 1,
              }),
            ]),
          }),
          expect.objectContaining({
            name: 'Dinning Table',
            containArticles: expect.arrayContaining([
              expect.objectContaining({
                artId: '1',
                amountOf: 4,
              }),
              expect.objectContaining({
                artId: '2',
                amountOf: 8,
              }),
              expect.objectContaining({
                artId: '4',
                amountOf: 1,
              }),
            ]),
          }),
        ]),
      );
    });
  });
});
