import { connect, close } from '../connection';
import { getAvaiability } from '../helpers/getAvailability';
import { Article, Product } from '../interfaces';
import { MArticle, MProduct } from '../models';

const mapProductToShape = (
  { name, containArticles }: Product,
  requiredArticlesInStock: Article[],
) => ({
  name,
  available: getAvaiability(containArticles, requiredArticlesInStock),
});

export const listInventory = async (connectionString: string) => {
  try {
    await connect(connectionString);

    const products = await MProduct.find({});

    if (products.length < 1) {
      await close();
      console.log('No products found in warehouse');
      return;
    }

    const allArticlesRequired: Set<string> = new Set();
    products.forEach((product) =>
      product.containArticles.forEach((article) =>
        allArticlesRequired.add(article.artId),
      ),
    );

    const requiredArticlesInStock = await MArticle.find({
      artId: { $in: [...allArticlesRequired] },
      stock: { $ne: 0 },
    });

    await close();

    if (requiredArticlesInStock.length < 1) {
      console.log('Non of the articles needed to make products are in stock');
      return;
    }

    const productsWithAvailability: { name: string; available: number }[] = [];
    products.forEach((product) => {
      productsWithAvailability.push(
        mapProductToShape(product, requiredArticlesInStock),
      );
    });

    return {
      data: {
        productsWithAvailability: productsWithAvailability,
      },
    };
  } catch (err) {
    console.log('something went wrong:\n', err);
  }
};
