import { close, connect, getMongod, stopMongod } from '../connection';
import { listInventory } from '../list/list';
import { MArticle, MProduct } from '../models';
import { mockArticles, mockProducts } from '../test/mocks/mocks';

describe('list', () => {
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

  describe('listInventory', () => {
    it('returns, and logs message to console if no products found', async () => {
      const logSpy = jest.spyOn(console, 'log');
      const result = await listInventory(connectionString);
      expect(logSpy).toHaveBeenCalledWith('No products found in warehouse');
      expect(result).toEqual(undefined);
    });

    it('returns, and logs message to console if required articles not in stock', async () => {
      const logSpy = jest.spyOn(console, 'log');
      await connect(connectionString);
      await MProduct.insertMany(mockProducts);
      await close();
      const result = await listInventory(connectionString);
      expect(logSpy).toHaveBeenCalledWith(
        'Non of the articles needed to make products are in stock',
      );
      expect(result).toEqual(undefined);
    });

    it('returns correct result', async () => {
      await connect(connectionString);
      await MProduct.insertMany(mockProducts);
      await MArticle.insertMany(mockArticles);
      await close();
      const result = await listInventory(connectionString);
      expect(result?.data.productsWithAvailability).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'Dining Chair', available: 2 }),
          expect.objectContaining({ name: 'Dining Chair', available: 2 }),
        ]),
      );
    });
  });
});
