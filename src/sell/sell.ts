import { connect, close } from '../connection';
import { getAvaiability } from '../helpers/getAvailability';
import { MArticle, MProduct } from '../models';

export const sellProduct = async (
  connectionString: string,
  productName: string,
) => {
  try {
    await connect(connectionString);

    const product = await MProduct.findOne({ name: productName });

    if (!product) {
      await close();
      console.log(`Sorry, product: ${productName} not found in warehouse`);
      return;
    }

    if (!product?.containArticles) {
      await close();
      throw Error('No articles found in product');
    }

    const allArticlesRequired: Set<string> = new Set();

    product.containArticles.forEach((article) =>
      allArticlesRequired.add(article.artId),
    );

    const requiredArticlesInStock = await MArticle.find({
      artId: { $in: [...allArticlesRequired] },
      stock: { $ne: 0 },
    });

    const minimumAvailable = getAvaiability(
      product.containArticles,
      requiredArticlesInStock,
    );

    if (minimumAvailable < 1) {
      await close();
      console.log('Sorry this product is not available');
      return;
    }

    for (const article of product.containArticles) {
      await MArticle.findOneAndUpdate(
        { artId: article.artId },
        { $inc: { stock: -article.amountOf } },
      );
    }

    await close();

    console.log(`${productName} sold!`);
  } catch (err) {
    console.log('something went wrong:\n', err);
  }
};
