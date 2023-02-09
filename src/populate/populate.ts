import fs from 'fs';
import { Article, ContainArticles, Product } from '../interfaces';
import { MArticle, MProduct } from '../models';
import { connect, close, clear } from '../connection';

const getJSON = async (path: string) => {
  try {
    const jsonString = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(jsonString);
  } catch (err) {
    console.log('Error getting JSON:', err);
  }
};

const mapArticleToDbShape = ({
  art_id,
  name,
  stock,
}: {
  art_id: string;
  name: string;
  stock: string;
}): Article => ({
  artId: art_id,
  name,
  stock: typeof Number(stock) === 'number' ? Number(stock) : 0,
});

const mapContainArticleToDbShape = ({
  art_id,
  amount_of,
}: {
  art_id: string;
  amount_of: string;
}): ContainArticles => ({
  artId: art_id,
  amountOf: typeof Number(amount_of) === 'number' ? Number(amount_of) : 0,
});

const mapProductToDbShape = ({
  name,
  contain_articles,
}: {
  name: string;
  contain_articles: any;
}): Product => ({
  name,
  containArticles:
    contain_articles.length > 0
      ? contain_articles.map((article: { art_id: string; amount_of: string }) =>
          mapContainArticleToDbShape(article),
        )
      : [],
});

export const populateWarehouse = async (
  connectionString: string,
  inventoryPath: string,
  productsPath: string,
) => {
  try {
    const inventoryJSON = await getJSON(inventoryPath);
    const articles = inventoryJSON?.inventory;
    const mappedArticles = articles.map((article: any) =>
      mapArticleToDbShape(article),
    );

    const productsJSON = await getJSON(productsPath);
    const products = await productsJSON?.products;
    const mappedProducts = products.map((product: any) =>
      mapProductToDbShape(product),
    );

    await connect(connectionString);

    await clear();
    const articleResult = await MArticle.insertMany(mappedArticles);
    const productResult = await MProduct.insertMany(mappedProducts);

    await close();

    return {
      data: {
        articles: articleResult,
        products: productResult,
      },
    };
  } catch (err) {
    console.log('something went wrong:\n', err);
  }
};
