import { close, connect, getMongod, stopMongod } from '../connection';
import { MArticle, MProduct } from '../models';
import {
  mockArticles,
  mockProduct1,
  mockProducts,
  mockProductWithNoArticles,
  mockUnavailableProduct,
} from '../test/mocks/mocks';
import { sellProduct } from './sell';

describe('sell', () => {
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
  afterAll(async () => {
    await close();
  });

  describe('sellProduct', () => {
    it('returns, and logs message if product not found in warehouse', async () => {
      const logSpy = jest.spyOn(console, 'log');
      const result = await sellProduct(connectionString, 'Imaginary Product');
      expect(logSpy).toHaveBeenCalledWith(
        'Sorry, product: Imaginary Product not found in warehouse',
      );
      expect(result).toEqual(undefined);
    });

    it('returns, and logs message if product does not have any articles', async () => {
      const logSpy = jest.spyOn(console, 'log');
      await connect(connectionString);
      await MProduct.collection.insertOne(mockProductWithNoArticles);
      await close();
      const result = await sellProduct(
        connectionString,
        mockProductWithNoArticles.name,
      );
      expect(logSpy).toHaveBeenCalledWith('No articles found in product');
      expect(result).toEqual(undefined);
    });

    it('returns, and logs message if product is not available', async () => {
      const logSpy = jest.spyOn(console, 'log');
      await connect(connectionString);
      await MProduct.collection.insertOne(mockUnavailableProduct);
      await close();
      const result = await sellProduct(
        connectionString,
        mockUnavailableProduct.name,
      );
      expect(logSpy).toHaveBeenCalledWith(
        'Sorry this product is not available',
      );
      expect(result).toEqual(undefined);
    });

    it('returns correct result', async () => {
      await connect(connectionString);
      await MProduct.insertMany(mockProducts);
      await MArticle.insertMany(mockArticles);
      await close();
      const result = await sellProduct(connectionString, mockProduct1.name);
      expect(result?.data.articles).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ artId: '1', name: 'leg', stock: 12 }),
          expect.objectContaining({ artId: '2', name: 'screw', stock: 17 }),
          expect.objectContaining({ artId: '3', name: 'seat', stock: 2 }),
        ]),
      );
    });
  });
});
