import { Article, Product } from '../../interfaces';

export const mockProduct1: Product = {
  name: 'Dining Chair',
  containArticles: [
    {
      artId: '1',
      amountOf: 4,
    },
    {
      artId: '2',
      amountOf: 8,
    },
    {
      artId: '3',
      amountOf: 1,
    },
  ],
};

export const mockProduct2: Product = {
  name: 'Dinning Table',
  containArticles: [
    {
      artId: '1',
      amountOf: 4,
    },
    {
      artId: '2',
      amountOf: 8,
    },
    {
      artId: '4',
      amountOf: 1,
    },
  ],
};

export const mockProductWithNoArticles: Product = {
  name: 'Coffee Table',
  containArticles: [],
};

export const mockUnavailableProduct: Product = {
  name: 'Coffee Table',
  containArticles: [{ artId: '10', amountOf: 1 }],
};

export const mockProducts: Product[] = [mockProduct1, mockProduct2];

export const mockArticle1: Article = { artId: '1', name: 'leg', stock: 12 };
export const mockArticle2: Article = {
  artId: '2',
  name: 'screw',
  stock: 17,
};
export const mockArticle3: Article = {
  artId: '3',
  name: 'seat',
  stock: 2,
};
export const mockArticle4: Article = {
  artId: '4',
  name: 'table top',
  stock: 1,
};

export const mockArticles: Article[] = [
  mockArticle1,
  mockArticle2,
  mockArticle3,
  mockArticle4,
];
