import { Article, ContainArticles } from '../interfaces';

export const getAvaiability = (
  containArticles: ContainArticles[],
  requiredArticlesInStock: Article[],
): number => {
  const maxAvaiabilies: number[] = [];

  containArticles.forEach((article) => {
    const requiredArticle = requiredArticlesInStock.find(
      (requiredArticle) => requiredArticle.artId === article.artId,
    );

    const maxAvaiability =
      requiredArticle?.stock && requiredArticle?.stock > 0
        ? Math.floor(requiredArticle?.stock / article.amountOf)
        : 0;

    maxAvaiabilies.push(maxAvaiability);
  });

  return Math.min(...maxAvaiabilies);
};
